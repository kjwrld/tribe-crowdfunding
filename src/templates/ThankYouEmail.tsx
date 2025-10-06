import { CheckCircle, Heart } from 'lucide-react';

interface ThankYouEmailProps {
  firstName: string;
  amount: string;
  type?: string;
}

export function ThankYouEmailTemplate({ firstName, amount, type }: ThankYouEmailProps) {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      padding: '32px',
      textAlign: 'center',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Success Icon */}
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: '#dcfce7',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px auto'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          color: '#16a34a'
        }}>
          ✓
        </div>
      </div>

      {/* Thank You Message */}
      <h2 style={{
        fontFamily: 'Nunito, Arial, sans-serif',
        fontWeight: 'bold',
        color: '#4c1d95',
        fontSize: '28px',
        marginBottom: '16px',
        margin: '0 0 16px 0'
      }}>
        Thank You{firstName ? `, ${firstName}` : ''}! 🎓
      </h2>

      <p style={{
        fontFamily: 'Nunito, Arial, sans-serif',
        color: '#6b7280',
        fontSize: '16px',
        marginBottom: '24px',
        lineHeight: '1.5'
      }}>
        Your generous donation will help transform STEM education and empower the next generation of innovators.
      </p>

      {/* Payment Details */}
      <div style={{
        backgroundColor: '#dcfce7',
        border: '1px solid #bbf7d0',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <span style={{ color: '#16a34a', fontSize: '16px' }}>♥</span>
          <span style={{
            fontFamily: 'Nunito, Arial, sans-serif',
            fontWeight: '500',
            color: '#166534',
            fontSize: '14px'
          }}>
            Donation Confirmed
          </span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Nunito, Arial, sans-serif',
            fontWeight: 'bold',
            color: '#14532d',
            fontSize: '20px',
            margin: '0 0 4px 0'
          }}>
            ${amount}
          </p>
          <p style={{
            fontFamily: 'Nunito, Arial, sans-serif',
            color: '#15803d',
            fontSize: '14px',
            margin: '0'
          }}>
            {type === 'monthly' ? 'Monthly Subscription' : 'One-Time Donation'}
          </p>
        </div>
      </div>

      {/* What Happens Next */}
      <div style={{
        textAlign: 'left',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: 'bold',
          color: '#4c1d95',
          fontSize: '16px',
          marginBottom: '12px'
        }}>
          What happens next:
        </h3>
        <ul style={{
          padding: '0',
          margin: '0',
          listStyle: 'none'
        }}>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <span style={{ color: '#16a34a', marginTop: '2px' }}>✓</span>
            <span style={{
              fontFamily: 'Nunito, Arial, sans-serif',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              You'll receive a confirmation email with your receipt
            </span>
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <span style={{ color: '#16a34a', marginTop: '2px' }}>✓</span>
            <span style={{
              fontFamily: 'Nunito, Arial, sans-serif',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Your donation directly supports STEM programs for underrepresented students
            </span>
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <span style={{ color: '#16a34a', marginTop: '2px' }}>✓</span>
            <span style={{
              fontFamily: 'Nunito, Arial, sans-serif',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              You'll receive updates on the impact of your contribution
            </span>
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div style={{
        backgroundColor: 'linear-gradient(to right, #8614ff, #6d00e0)',
        background: '#8614ff',
        borderRadius: '16px',
        padding: '12px 24px',
        textAlign: 'center'
      }}>
        <a href="https://younggiftedbeautiful.org" style={{
          color: '#ffffff',
          textDecoration: 'none',
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeight: '500',
          fontSize: '16px'
        }}>
          Continue Exploring YGBVerse
        </a>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '32px',
        paddingTop: '24px',
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center'
      }}>
        <p style={{
          fontFamily: 'Nunito, Arial, sans-serif',
          color: '#9ca3af',
          fontSize: '12px',
          margin: '0'
        }}>
          This email was sent by YGBVerse. If you have any questions, please contact us at info@younggiftedbeautiful.org
        </p>
      </div>
    </div>
  );
}

// Function to generate HTML string for email services
export function generateThankYouEmailHTML(firstName: string, amount: string, type?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Donation - YGBVerse</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 20px; background-color: #f3f4f6;">
  <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; padding: 32px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
    
    <!-- Success Icon -->
    <div style="width: 80px; height: 80px; background-color: #dcfce7; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px;">
      <div style="width: 48px; height: 48px; color: #16a34a; font-size: 36px; font-weight: bold;">
        ✓
      </div>
    </div>

    <!-- Thank You Message -->
    <h2 style="font-family: 'Nunito', Arial, sans-serif; font-weight: bold; color: #4c1d95; font-size: 28px; margin: 0 0 16px 0;">
      Thank You${firstName ? `, ${firstName}` : ''}! 🎓
    </h2>

    <p style="font-family: 'Nunito', Arial, sans-serif; color: #6b7280; font-size: 16px; margin-bottom: 24px; line-height: 1.5;">
      Your generous donation will help transform STEM education and empower the next generation of innovators.
    </p>

    <!-- Payment Details -->
    <div style="background-color: #dcfce7; border: 1px solid #bbf7d0; border-radius: 16px; padding: 16px; margin-bottom: 24px;">
      <div style="text-align: center; margin-bottom: 8px;">
        <span style="color: #16a34a; font-size: 16px; margin-right: 8px;">♥</span>
        <span style="font-family: 'Nunito', Arial, sans-serif; font-weight: 500; color: #166534; font-size: 14px;">
          Donation Confirmed
        </span>
      </div>
      <div style="text-align: center;">
        <p style="font-family: 'Nunito', Arial, sans-serif; font-weight: bold; color: #14532d; font-size: 20px; margin: 0 0 4px 0;">
          $${amount}
        </p>
        <p style="font-family: 'Nunito', Arial, sans-serif; color: #15803d; font-size: 14px; margin: 0;">
          ${type === 'monthly' ? 'Monthly Subscription' : 'One-Time Donation'}
        </p>
      </div>
    </div>

    <!-- What Happens Next -->
    <div style="text-align: left; margin-bottom: 24px;">
      <h3 style="font-family: 'Nunito', Arial, sans-serif; font-weight: bold; color: #4c1d95; font-size: 16px; margin-bottom: 12px;">
        What happens next:
      </h3>
      <div style="margin-bottom: 8px;">
        <span style="color: #16a34a; margin-right: 8px;">✓</span>
        <span style="font-family: 'Nunito', Arial, sans-serif; color: #6b7280; font-size: 14px;">
          You'll receive a confirmation email with your receipt
        </span>
      </div>
      <div style="margin-bottom: 8px;">
        <span style="color: #16a34a; margin-right: 8px;">✓</span>
        <span style="font-family: 'Nunito', Arial, sans-serif; color: #6b7280; font-size: 14px;">
          Your donation directly supports STEM programs for underrepresented students
        </span>
      </div>
      <div>
        <span style="color: #16a34a; margin-right: 8px;">✓</span>
        <span style="font-family: 'Nunito', Arial, sans-serif; color: #6b7280; font-size: 14px;">
          You'll receive updates on the impact of your contribution
        </span>
      </div>
    </div>

    <!-- Call to Action -->
    <div style="background: linear-gradient(to right, #8614ff, #6d00e0); border-radius: 16px; padding: 12px 24px; text-align: center; margin-bottom: 32px;">
      <a href="https://younggiftedbeautiful.org" style="color: #ffffff; text-decoration: none; font-family: 'Nunito', Arial, sans-serif; font-weight: 500; font-size: 16px;">
        Continue Exploring YGBVerse
      </a>
    </div>

    <!-- Footer -->
    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
      <p style="font-family: 'Nunito', Arial, sans-serif; color: #9ca3af; font-size: 12px; margin: 0;">
        This email was sent by YGBVerse. If you have any questions, please contact us at info@younggiftedbeautiful.org
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}