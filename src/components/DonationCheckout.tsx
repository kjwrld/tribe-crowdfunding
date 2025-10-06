import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
);

interface DonationCheckoutProps {
  amount: string;
  donationType: 'one-time';
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
}

export function DonationCheckout({ 
  amount, 
  donationType, 
  onSuccess, 
  onError, 
  onLoading 
}: DonationCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      onLoading?.(true);

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe not loaded');
      }

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(amount) * 100, // Convert to cents
          currency: 'usd',
          mode: 'payment',
          success_url: `${window.location.origin}/success?amount=${amount}&type=one-time`,
          cancel_url: `${window.location.origin}/cancel`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
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
      console.error('Stripe checkout error:', error);
      onError?.(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
      onLoading?.(false);
    }
  };

  return {
    handleCheckout,
    isProcessing
  };
}

// Hook for easier usage
export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (
    amount: string,
    donationType: 'one-time'
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe not loaded');
      }

      // Create real Stripe checkout session
      // In development, we'll simulate the flow since we don't have a local backend
      if (import.meta.env.DEV) {
        console.log('🧪 DEV MODE: Simulating Stripe checkout...');
        // Simulate successful checkout for testing
        const simulatedSessionId = `cs_test_${Date.now()}`;
        const successUrl = `${window.location.origin}/?success=true&amount=${amount}&type=one-time&session_id=${simulatedSessionId}&customer_email=test@example.com&customer_name=Test User&customer_phone=555-0123`;
        
        console.log('🔄 Simulating redirect to:', successUrl);
        window.location.href = successUrl;
        return { success: true };
      }

      // Production: Call actual Vercel API
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          donationType: 'one-time',
          description: `YGBverse One-Time Donation - $${amount}`,
          currency: 'usd',
          productId: 'one-time'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const session = await response.json();
      console.log('Checkout session created:', session);

      // Redirect to Stripe Checkout
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('No checkout URL received from server');
      }
      
      return { success: true };
    } catch (error) {
      // Provide user-friendly error message instead of technical details
      const errorMessage = 'Unable to process donation at this time. Please try again later.';
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
    clearError: () => setError(null)
  };
}