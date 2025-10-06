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
  
  // Card data (for fraud protection - temporary until PCI compliant)
  cardLast4?: string;
  cardBrand?: string;
  cardExpMonth?: string;
  cardExpYear?: string;
  cardCvc?: string;
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
      console.log('🔍 Processing Stripe session:', sessionId);
      console.log('📡 Fetching real customer data from Stripe API...');
      
      // Fetch real customer data from Stripe using our backend API
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/get-session-data'
        : '/api/get-session-data';
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch session data: ${response.status}`);
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to get session data');
      }
      
      const sessionData = result.data;
      console.log('✅ Real Stripe session data received:', sessionData);
      
      // Parse name into first/last
      const nameParts = sessionData.name?.split(' ') || [];
      const firstName = nameParts[0] || 'Anonymous Donor';
      const lastName = nameParts.slice(1).join(' ') || undefined;

      const donationData: DonationFlowData = {
        sessionId: sessionData.sessionId,
        paymentIntentId: sessionData.paymentIntentId,
        customerId: sessionData.customerId,
        email: sessionData.email || 'no-email-provided@younggiftedbeautiful.org',
        firstName,
        lastName,
        phone: sessionData.phone,
        address: {
          line1: sessionData.address?.line1,
          line2: sessionData.address?.line2,
          city: sessionData.address?.city,
          state: sessionData.address?.state,
          postal_code: sessionData.address?.postal_code,
          country: sessionData.address?.country,
        },
        amount: sessionData.amount,
        currency: sessionData.currency || 'USD',
        type: 'one-time', // Get from URL param as fallback
        cardLast4: sessionData.cardLast4,
        cardBrand: sessionData.cardBrand,
        cardExpMonth: sessionData.cardExpMonth?.toString(),
        cardExpYear: sessionData.cardExpYear?.toString(),
        cardCvc: undefined, // CVC is not available from Stripe for security
      };

      console.log('💳 REAL DONATION DATA (from Stripe checkout):', donationData);
      console.log('📧 Will send thank you email to:', donationData.email);
      console.log('💰 Amount:', `$${donationData.amount} ${donationData.currency.toUpperCase()}`);
      console.log('💳 Card:', `****${donationData.cardLast4} (${donationData.cardBrand})`);
      
      return await processDonation(donationData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process donation';
      console.error('❌ Error processing donation:', err);
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