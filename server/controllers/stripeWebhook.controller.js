
import stripe from "../config/stripe.js";
import User from "../models/user.model.js";

export const stripeWebhook = async (req, res) => {
  console.log("STRIPE WEBHOOK HIT");

    const signature = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        console.error("Stripe webhook signature or secret missing");
        return res.status(400).json({
            message: "Webhook configuration missing"
        });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            webhookSecret
        );
    } catch (error) {
        console.error("Stripe signature verification failed:", error.message);

        return res.status(400).json({
            message: "Invalid webhook signature"
        });
    }

    try {
        if (event.type !== "checkout.session.completed") {
            return res.json({ received: true });
        }

        const session = event.data.object;

        // Never grant credits for an unpaid session.
        if (session.payment_status !== "paid") {
            return res.json({ received: true });
        }

        const userId = session.metadata?.userId;
        const credits = Number(session.metadata?.credits);
        const plan = session.metadata?.plan;

        if (
            !userId ||
            !session.id ||
            !Number.isSafeInteger(credits) ||
            credits <= 0 ||
            !["pro", "enterprise"].includes(plan)
        ) {
            console.error("Invalid checkout session metadata:", session.id);

            return res.status(400).json({
                message: "Invalid checkout session metadata"
            });
        }

        // One atomic database update prevents duplicate credit grants.
        const updatedUser = await User.findOneAndUpdate(
            {
                _id: userId,
                processedStripeSessions: { $ne: session.id }
            },
            {
                $inc: { credits: credits },
                $set: { plan: plan },
                $addToSet: {
                    processedStripeSessions: session.id
                }
            },
            { new: true }
        );

        if (updatedUser) {
            console.log(
                `Credits added for user ${userId}. Balance: ${updatedUser.credits}`
            );

            return res.json({ received: true });
        }

        // A missing update can mean a retry of an already processed payment.
        const existingUser = await User.findById(userId);

        if (
            existingUser?.processedStripeSessions?.includes(session.id)
        ) {
            return res.json({ received: true });
        }

        // Let Stripe retry if the user was not found or processing failed.
        console.error("User not found or credits were not updated:", userId);

        return res.status(500).json({
            message: "Could not apply payment credits"
        });
    } catch (error) {
        console.error("Stripe webhook processing error:", error);

        return res.status(500).json({
            message: "Webhook processing failed"
        });
    }
};
