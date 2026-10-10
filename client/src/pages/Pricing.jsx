
import { ArrowLeft, Check, Coins } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';

const plans = [
    {
        key: 'free',
        name: 'Free',
        price: '₹0',
        credits: 200,
        description: 'Perfect to explore SitePilot-AI',
        feature: [
            'AI website generation',
            'Responsive HTML output',
            'Basic animations',
        ],
        popular: false,
        button: 'Get Started',
    },
    {
        key: 'pro',
        name: 'Pro',
        price: '₹499',
        credits: 700,
        description: 'For serious creators & freelancers',
        feature: [
            'Everything in Free',
            'Faster generation',
            'Edit & regenerate',
        ],
        popular: true,
        button: 'Upgrade to Pro',
    },
    {
        key: 'enterprise',
        name: 'Enterprise',
        price: '₹1499',
        credits: 1200,
        description: 'For teams & power users',
        feature: [
            'Unlimited iterations',
            'Highest priority',
            'Team collaboration',
            'Dedicated support',
        ],
        popular: false,
        button: 'Contact Sales',
    },
];

function Pricing() {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(null);
    const [verifyingPayment, setVerifyingPayment] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const verifyPayment = async () => {
            const params = new URLSearchParams(window.location.search);
            const payment = params.get('payment');
            const sessionId = params.get('session_id');

            if (payment !== 'success' || !sessionId) return;

            setVerifyingPayment(true);

            try {
                const result = await axios.post(
                    `${serverUrl}/api/billing/verify-session`,
                    { sessionId },
                    { withCredentials: true }
                );

                if (cancelled) return;

                window.history.replaceState({}, '', '/pricing');

                alert(
                    result.data.message === 'Payment already applied'
                        ? `Payment already processed. Current credits: ${result.data.credits}`
                        : `Payment verified! Current credits: ${result.data.credits}`
                );

                navigate('/dashboard');
            } catch (error) {
                if (cancelled) return;

                console.error(
                    'Payment verification failed:',
                    error.response?.data || error.message
                );

                const message =
                    error.response?.data?.message ||
                    'Payment verification failed. Please do not pay again. Contact support with your Checkout Session ID.';

                alert(message);
            } finally {
                if (!cancelled) {
                    setVerifyingPayment(false);
                }
            }
        };

        verifyPayment();

        return () => {
            cancelled = true;
        };
    }, [navigate]);

    const handleBuy = async (planKey) => {
        if (verifyingPayment || loading !== null) return;

        if (!userData) {
            navigate('/');
            return;
        }

        if (planKey === 'free') {
            navigate('/dashboard');
            return;
        }

        setLoading(planKey);

        try {
            const result = await axios.post(
                `${serverUrl}/api/billing`,
                { planType: planKey },
                { withCredentials: true }
            );

            if (!result.data?.sessionUrl) {
                throw new Error('Stripe Checkout URL was not returned.');
            }

            window.location.href = result.data.sessionUrl;
        } catch (error) {
            console.error(
                'Checkout error:',
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                'Unable to start checkout. Please try again.'
            );

            setLoading(null);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050505] px-6 pt-16 pb-24 text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[120px]" />
            </div>

            <button
                type="button"
                className="relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                onClick={() => navigate('/')}
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 mx-auto mb-14 max-w-4xl text-center"
            >
                <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                    Simple, transparent pricing
                </h1>

                <p className="text-lg text-zinc-400">
                    Buy credits once. Build anytime.
                </p>
            </motion.div>

            {verifyingPayment && (
                <p className="relative z-10 mb-8 text-center text-indigo-300">
                    Verifying your payment securely...
                </p>
            )}

            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.key}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.12 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`relative rounded-3xl border p-8 backdrop-blur-xl ${
                            plan.popular
                                ? 'border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30'
                                : 'border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10'
                        }`}
                    >
                        {plan.popular && (
                            <span className="absolute top-5 right-5 rounded-full bg-indigo-500 px-3 py-1 text-xs">
                                Most Popular
                            </span>
                        )}

                        <h2 className="mb-2 text-xl font-semibold">
                            {plan.name}
                        </h2>

                        <p className="mb-6 text-sm text-zinc-400">
                            {plan.description}
                        </p>

                        <div className="mb-4 flex items-end gap-1">
                            <span className="text-4xl font-bold">
                                {plan.price}
                            </span>
                            <span className="mb-1 text-sm text-zinc-400">
                                /one-time
                            </span>
                        </div>

                        <div className="mb-8 flex items-center gap-2">
                            <Coins size={18} className="text-yellow-400" />
                            <span className="font-semibold">
                                {plan.credits} Credits
                            </span>
                        </div>

                        <ul className="mb-10 space-y-3">
                            {plan.feature.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-2 text-sm text-zinc-300"
                                >
                                    <Check
                                        size={16}
                                        className="text-green-400"
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            disabled={loading !== null || verifyingPayment}
                            onClick={() => handleBuy(plan.key)}
                            className={`w-full rounded-xl py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                plan.popular
                                    ? 'bg-indigo-500 hover:bg-indigo-600'
                                    : 'bg-white/10 hover:bg-white/20'
                            }`}
                        >
                            {loading === plan.key
                                ? 'Redirecting...'
                                : verifyingPayment
                                  ? 'Verifying payment...'
                                  : plan.button}
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Pricing;
