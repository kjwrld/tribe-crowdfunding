// Stripe client functions for fetching real checkout session data

export interface StripeCustomerDetails {
  email: string;
  name?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}

export interface StripeSessionData {
  id: string;
  amount_total: number;
  currency: string;
  mode: 'payment' | 'subscription';
  payment_status: 'paid' | 'unpaid';
  customer_details: StripeCustomerDetails;
  customer?: string;
  payment_intent?: string;
}

/**
 * Fetch Stripe checkout session data using session ID
 * This would typically be called from your backend, but for testing
 * we'll simulate the data structure you'd get from Stripe
 */
export async function fetchStripeSession(sessionId: string): Promise<StripeSessionData | null> {
  try {
    // In a real implementation, this would call your backend API
    // which would use the Stripe SDK to fetch session data
    // For now, we'll return null to indicate we need backend integration
    
    console.log('🔍 Would fetch Stripe session:', sessionId);
    console.log('⚠️  Backend API needed to fetch real Stripe session data');
    
    return null;
  } catch (error) {
    console.error('Error fetching Stripe session:', error);
    return null;
  }
}

/**
 * Parse customer name into first and last name
 */
export function parseCustomerName(fullName?: string): { firstName: string; lastName?: string } {
  if (!fullName) {
    return { firstName: 'Anonymous' };
  }
  
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || 'Anonymous';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined;
  
  return { firstName, lastName };
}

/**
 * Format amount from cents to dollars
 */
export function formatStripeAmount(amountInCents: number): number {
  return amountInCents / 100;
}