import { useState } from 'react';
import { useDonationFlow } from '../hooks/useDonationFlow';
import { PaymentSuccess } from './PaymentSuccess';

export function TestDonationButton() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [testAmount, setTestAmount] = useState('25');
  const [testType, setTestType] = useState<'one-time' | 'monthly'>('one-time');
  const { processDonationFromStripeSession, isProcessing } = useDonationFlow();

  const handleTestDonation = async () => {
    // Simulate URL parameters that would come from Stripe
    const params = new URLSearchParams();
    params.set('amount', testAmount);
    params.set('type', testType);
    params.set('session_id', `test_session_${Date.now()}`);
    
    // Update URL to simulate Stripe redirect
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    
    // Show success modal which will trigger the donation processing
    setShowSuccess(true);
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border-2 border-red-500">
      <h3 className="font-bold text-red-600 mb-2">🧪 TEST MODE</h3>
      <div className="space-y-2 mb-3">
        <div>
          <label className="block text-sm font-medium mb-1">Amount:</label>
          <input
            type="number"
            value={testAmount}
            onChange={(e) => setTestAmount(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            min="1"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type:</label>
          <select
            value={testType}
            onChange={(e) => setTestType(e.target.value as 'one-time' | 'monthly')}
            className="w-full px-2 py-1 border rounded"
          >
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleTestDonation}
        disabled={isProcessing}
        className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Test Donation Flow'}
      </button>
      <p className="text-xs text-gray-500 mt-1">
        Tests Mailchimp + Supabase without real payment
      </p>
      
      {showSuccess && (
        <PaymentSuccess onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}