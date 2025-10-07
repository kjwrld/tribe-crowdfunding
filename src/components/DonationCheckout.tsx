import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
        "pk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
);

interface DonationCheckoutProps {
    amount: string;
    donationType: "one-time";
    onSuccess?: () => void;
    onError?: (error: string) => void;
    onLoading?: (loading: boolean) => void;
}

export function DonationCheckout({
    amount,
    donationType,
    onSuccess,
    onError,
    onLoading,
}: DonationCheckoutProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async () => {
        try {
            setIsProcessing(true);
            onLoading?.(true);

            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error("Stripe not loaded");
            }

            // Create checkout session
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: parseInt(amount) * 100, // Convert to cents
                    currency: "usd",
                    mode: "payment",
                    success_url: `${window.location.origin}/success?amount=${amount}&type=one-time`,
                    cancel_url: `${window.location.origin}/cancel`,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create checkout session");
            }

            const session = await response.json();

            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            onSuccess?.();
        } catch (error) {
            console.error("Stripe checkout error:", error);
            onError?.(
                error instanceof Error ? error.message : "Payment failed"
            );
        } finally {
            setIsProcessing(false);
            onLoading?.(false);
        }
    };

    return {
        handleCheckout,
        isProcessing,
    };
}

// Hook for easier usage
export function useStripeCheckout() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createCheckoutSession = async (
        amount: string,
        donationType: "one-time" | "monthly"
    ) => {
        try {
            setIsLoading(true);
            setError(null);

            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error("Stripe not loaded");
            }

            // Create real Stripe checkout session
            // We need to call our backend API to create the session securely
            // console.log("💳 Creating REAL Stripe checkout session via API...");

            const apiUrl = import.meta.env.DEV
                ? "http://localhost:3001/api/create-checkout-session" // Local Express server
                : "/api/create-checkout-session"; // Vercel API

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: parseInt(amount),
                    donationType: donationType,
                    description: `YGBverse ${donationType === "monthly" ? "Monthly" : "One-Time"} Donation - $${amount}`,
                    currency: "usd",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || `Server error: ${response.status}`
                );
            }

            const session = await response.json();
            // console.log('Checkout session created:', session);

            // Redirect to Stripe Checkout
            if (session.url) {
                window.location.href = session.url;
            } else {
                throw new Error("No checkout URL received from server");
            }

            return { success: true };
        } catch (error) {
            // Provide user-friendly error message instead of technical details
            const errorMessage =
                "Unable to process donation at this time. Please try again later.";
            setError(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createCheckoutSession,
        isLoading,
        error,
        clearError: () => setError(null),
    };
}
