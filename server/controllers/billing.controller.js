
import { PLANS } from "../config/plan.js";
import stripe from "../config/stripe.js";

export const billing = async (req, res) => {
    try {
        const { planType } = req.body;
        const userId = req.user._id;
        const plan = PLANS[planType];

        if (!plan || plan.price == 0) {
            return res.status(400).json({ message: "invalid paid plan" });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `SitePilot-AI ${planType.toUpperCase()} plan`
                        },
                        unit_amount: plan.price * 100
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId: userId.toString(),
                credits: String(plan.credits),
                plan: planType
            },
            success_url: `${process.env.FRONTEND_URL}/pricing?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/pricing`
        });

        return res.status(200).json({
            sessionUrl: session.url
        });
    } catch (error) {
        console.error("Billing error:", error);
        return res.status(500).json({
            message: `Billing error: ${error.message}`
        });
    }
};


export const verifyCheckoutSession = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const userId = req.user._id.toString();

        if (!sessionId) {
            return res.status(400).json({ message: "Session ID required" });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.metadata?.userId !== userId) {
            return res.status(403).json({ message: "Session does not belong to this user" });
        }

        if (session.payment_status !== "paid") {
            return res.status(400).json({ message: "Payment is not completed" });
        }

        const planType = session.metadata?.plan;
        const plan = PLANS[planType];

        if (!plan || plan.price <= 0) {
            return res.status(400).json({ message: "Invalid plan" });
        }

        const User = (await import("../models/user.model.js")).default;

        const updatedUser = await User.findOneAndUpdate(
            {
                _id: userId,
                processedStripeSessions: { $ne: session.id }
            },
            {
                $inc: { credits: plan.credits },
                $set: { plan: planType },
                $addToSet: { processedStripeSessions: session.id }
            },
            { new: true }
        );

        if (updatedUser) {
            return res.json({
                message: "Credits added successfully",
                credits: updatedUser.credits,
                plan: updatedUser.plan
            });
        }

        const existingUser = await User.findById(userId);

        if (existingUser?.processedStripeSessions?.includes(session.id)) {
            return res.json({
                message: "Payment already applied",
                credits: existingUser.credits,
                plan: existingUser.plan
            });
        }

        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        console.error("Checkout verification error:", error);
        return res.status(500).json({ message: "Could not verify payment" });
    }
};

