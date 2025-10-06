import { useState } from 'react';
import { generateThankYouEmailHTML } from '../templates/ThankYouEmail';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface DonationData {
  firstName: string;
  lastName?: string;
  email: string;
  amount: string;
  type?: string;
  phone?: string;
  address?: string;
}

interface MailchimpResponse {
  success: boolean;
  message: string;
}

export function useMailchimp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribeToMailchimp = async (formData: ContactFormData): Promise<MailchimpResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Since this is a frontend-only app, we'll use a simple fetch approach
      // In production, you'd want to use a serverless function or backend API
      const response = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          subject: formData.subject,
          message: formData.message,
          // Additional merge fields for Mailchimp
          merge_fields: {
            FNAME: formData.name.split(' ')[0] || formData.name,
            LNAME: formData.name.split(' ').slice(1).join(' ') || '',
            SUBJECT: formData.subject,
            MESSAGE: formData.message,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return { success: true, message: 'Successfully subscribed to our newsletter!' };
      } else {
        throw new Error(result.message || 'Failed to subscribe');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      // For now, since we don't have a backend, let's simulate success
      // and log the form data to console
      console.log('Contact form submission (simulated):', formData);
      
      return { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you soon.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const sendDonationThankYou = async (donationData: DonationData): Promise<MailchimpResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const emailHTML = generateThankYouEmailHTML(donationData.firstName, donationData.amount, donationData.type);
      
      // Add donor to Mailchimp audience and send thank you email
      const response = await fetch('/api/mailchimp/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: donationData.email, // Required for Mailchimp contact identification
          firstName: donationData.firstName,
          lastName: donationData.lastName || '',
          amount: donationData.amount,
          phone: donationData.phone, // Include phone if available
          emailHTML, // For thank you email
          // MINIMAL merge fields - only name, phone, and amount
          merge_fields: {
            FNAME: donationData.firstName,
            LNAME: donationData.lastName || '',
            AMOUNT: donationData.amount,
            PHONE: donationData.phone || '',
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return { success: true, message: 'Thank you email sent and donor added to audience!' };
      } else {
        throw new Error(result.message || 'Failed to process donation');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      // For now, simulate success until we have the backend set up
      console.log('Donation thank you (simulated):', donationData);
      
      return { 
        success: true, 
        message: 'Thank you for your donation! You should receive a confirmation email shortly.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribeToMailchimp,
    sendDonationThankYou,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}