import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Heart, ArrowLeft } from 'lucide-react';

interface PaymentSuccessProps {
  onClose: () => void;
}

export function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  const [paymentDetails, setPaymentDetails] = useState<{
    amount?: string;
    type?: string;
    sessionId?: string;
  }>({});

  useEffect(() => {
    // Get payment details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    const type = urlParams.get('type');
    const sessionId = urlParams.get('session_id');
    
    if (amount || type || sessionId) {
      setPaymentDetails({ amount, type, sessionId });
      
      // Clean up URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-[24px] p-8 max-w-md w-full text-center shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        {/* Success Animation */}
        <motion.div
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        {/* Thank You Message */}
        <motion.h2
          className="font-['Nunito:Bold',_sans-serif] font-bold text-[#4c1d95] text-[28px] mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Thank You! 🎓
        </motion.h2>

        <motion.p
          className="font-['Nunito:Regular',_sans-serif] text-[#6b7280] text-[16px] mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your generous donation will help transform STEM education and empower the next generation of innovators.
        </motion.p>

        {/* Payment Details */}
        {paymentDetails.amount && (
          <motion.div
            className="bg-green-50 border border-green-200 rounded-[16px] p-4 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-green-600" />
              <span className="font-['Nunito:Medium',_sans-serif] font-medium text-green-800 text-[14px]">
                Donation Confirmed
              </span>
            </div>
            <div className="text-center">
              <p className="font-['Nunito:Bold',_sans-serif] font-bold text-green-900 text-[20px]">
                ${paymentDetails.amount}
              </p>
              <p className="font-['Nunito:Regular',_sans-serif] text-green-700 text-[14px]">
                {paymentDetails.type === 'monthly' ? 'Monthly Subscription' : 'One-Time Donation'}
              </p>
            </div>
          </motion.div>
        )}

        {/* What Happens Next */}
        <motion.div
          className="text-left mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-['Nunito:Bold',_sans-serif] font-bold text-[#4c1d95] text-[16px] mb-3">
            What happens next:
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="font-['Nunito:Regular',_sans-serif] text-[#6b7280] text-[14px]">
                You'll receive a confirmation email with your receipt
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="font-['Nunito:Regular',_sans-serif] text-[#6b7280] text-[14px]">
                Your donation directly supports STEM programs for underrepresented students
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="font-['Nunito:Regular',_sans-serif] text-[#6b7280] text-[14px]">
                You'll receive updates on the impact of your contribution
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-[#8614ff] to-[#6d00e0] hover:opacity-90 transition-opacity duration-200 h-[48px] rounded-[16px] shadow-lg flex items-center justify-center gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <ArrowLeft className="w-4 h-4 text-white" />
          <span className="font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px]">
            Continue Exploring
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}