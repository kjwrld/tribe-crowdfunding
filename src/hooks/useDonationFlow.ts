import { useState } from 'react';
import { useMailchimp, DonationData } from './useMailchimp';
import { insertDonation, updateDonation, DonationRecord } from '../lib/supabase';

interface DonationFlowData {
  // Stripe data
  sessionId: string;
  paymentIntentId?: string;
  customerId?: string;
  
  // Customer data
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  
  // Payment data
  amount: number;
  currency: string;
  type: 'one-time' | 'monthly';
  
  // Card data (for display only - last 4 digits)
  cardLast4?: string;
  cardBrand?: string;
}

interface DonationFlowResponse {
  success: boolean;
  message: string;
  donationId?: string;
}

export function useDonationFlow() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendDonationThankYou } = useMailchimp();

  const processDonation = async (donationData: DonationFlowData): Promise<DonationFlowResponse> => {
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Save donation to Supabase
      const donationRecord: Omit<DonationRecord, 'id' | 'created_at'> = {
        email: donationData.email,
        first_name: donationData.firstName,
        last_name: donationData.lastName,
        phone: donationData.phone,
        address_line1: donationData.address?.line1,
        address_line2: donationData.address?.line2,
        city: donationData.address?.city,
        state: donationData.address?.state,
        postal_code: donationData.address?.postal_code,
        country: donationData.address?.country,
        amount: donationData.amount,
        currency: donationData.currency,
        donation_type: donationData.type,
        stripe_session_id: donationData.sessionId,
        stripe_payment_intent_id: donationData.paymentIntentId,
        stripe_customer_id: donationData.customerId,
        card_last_four: donationData.cardLast4,
        card_brand: donationData.cardBrand,
        payment_status: 'succeeded',
        mailchimp_sent: false,
      };

      const savedDonation = await insertDonation(donationRecord);
      console.log('Donation saved to database:', savedDonation.id);

      // Step 2: Send thank you email via Mailchimp
      try {
        const mailchimpData: DonationData = {
          firstName: donationData.firstName,
          lastName: donationData.lastName,
          email: donationData.email,
          amount: donationData.amount.toString(),
          type: donationData.type,
          phone: donationData.phone,
          address: donationData.address?.line1,
        };

        const emailResult = await sendDonationThankYou(mailchimpData);
        
        if (emailResult.success) {
          // Update donation record to mark email as sent
          await updateDonation(savedDonation.id, { mailchimp_sent: true });
          console.log('Thank you email sent and donation updated');
        } else {
          console.error('Failed to send thank you email:', emailResult.message);
        }
      } catch (emailError) {
        console.error('Error sending thank you email:', emailError);
        // Don't fail the whole process if email fails
      }

      return {
        success: true,
        message: 'Donation processed successfully!',
        donationId: savedDonation.id,
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error processing donation:', err);
      
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to process donation from Stripe session (for webhook or success page)
  const processDonationFromStripeSession = async (sessionId: string): Promise<DonationFlowResponse> => {
    try {
      // This would typically fetch session details from Stripe
      // For now, we'll extract from URL params or local storage
      const urlParams = new URLSearchParams(window.location.search);
      const amount = urlParams.get('amount');
      const type = urlParams.get('type');
      
      if (!amount) {
        throw new Error('Missing donation amount');
      }

      // You would typically fetch customer details from Stripe here
      // For now, we'll use placeholder data
      const donationData: DonationFlowData = {
        sessionId,
        email: 'donor@example.com', // This should come from Stripe session
        firstName: 'Anonymous', // This should come from Stripe session
        amount: parseFloat(amount),
        currency: 'USD',
        type: type === 'monthly' ? 'monthly' : 'one-time',
      };

      return await processDonation(donationData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process donation';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return {
    processDonation,
    processDonationFromStripeSession,
    isProcessing,
    error,
    clearError: () => setError(null),
  };
}