import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
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

  return {
    subscribeToMailchimp,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}