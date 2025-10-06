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
      // Extract donation details from URL params (what Stripe redirects with)
      const urlParams = new URLSearchParams(window.location.search);
      const amount = urlParams.get('amount');
      const type = urlParams.get('type');
      
      if (!amount) {
        console.error('❌ Missing donation amount in URL parameters');
        throw new Error('Missing donation amount - URL parameters may be missing');
      }

      // ⚠️ REAL STRIPE DATA WOULD COME FROM BACKEND API CALL
      // For now, we need to implement a backend endpoint that:
      // 1. Takes the sessionId
      // 2. Calls Stripe API: stripe.checkout.sessions.retrieve(sessionId)
      // 3. Returns the customer details, payment info, etc.
      
      console.log('🔍 Processing Stripe session:', sessionId);
      console.log('⚠️  Using URL params since backend API not implemented yet');
      console.log('📋 Available URL params:', Object.fromEntries(urlParams.entries()));

      // Extract customer details from URL (if available from your Stripe setup)
      const customerEmail = urlParams.get('customer_email') || urlParams.get('email');
      const customerName = urlParams.get('customer_name') || urlParams.get('name');
      const customerPhone = urlParams.get('customer_phone') || urlParams.get('phone');
      
      // Parse name into first/last
      const nameParts = customerName?.split(' ') || [];
      const firstName = nameParts[0] || 'Anonymous Donor';
      const lastName = nameParts.slice(1).join(' ') || undefined;

      const donationData: DonationFlowData = {
        sessionId: sessionId,
        paymentIntentId: urlParams.get('payment_intent_id') || undefined,
        customerId: urlParams.get('customer_id') || undefined,
        email: customerEmail || 'no-email-provided@younggiftedbeautiful.org',
        firstName,
        lastName,
        phone: customerPhone || undefined,
        address: {
          line1: urlParams.get('address_line1') || undefined,
          line2: urlParams.get('address_line2') || undefined,
          city: urlParams.get('address_city') || undefined,
          state: urlParams.get('address_state') || undefined,
          postal_code: urlParams.get('address_postal_code') || undefined,
          country: urlParams.get('address_country') || undefined,
        },
        amount: parseFloat(amount),
        currency: urlParams.get('currency') || 'USD',
        type: type === 'monthly' ? 'monthly' : 'one-time',
        cardLast4: urlParams.get('card_last4') || undefined,
        cardBrand: urlParams.get('card_brand') || undefined,
      };

      console.log('💳 REAL DONATION DATA (from Stripe checkout):', donationData);
      console.log('📧 Will send thank you email to:', donationData.email);
      console.log('💰 Amount:', `$${donationData.amount} ${donationData.currency.toUpperCase()}`);
      
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