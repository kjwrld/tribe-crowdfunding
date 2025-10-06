const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amount, donationType = 'one-time', description, currency = 'usd' } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    console.log('Creating checkout session for:', { amount, donationType, description });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: donationType === 'monthly' ? 'subscription' : 'payment',
      
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: description || `YGBverse ${donationType === 'monthly' ? 'Monthly' : 'One-Time'} Donation`,
              description: 'Supporting STEM education for underrepresented students',
            },
            ...(donationType === 'monthly' 
              ? {
                  recurring: { interval: 'month' },
                  unit_amount: Math.round(amount * 100),
                }
              : {
                  unit_amount: Math.round(amount * 100),
                }
            ),
          },
          quantity: 1,
        },
      ],
      
      success_url: `http://localhost:5173/?success=true&amount=${amount}&type=${donationType}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/?canceled=true`,
      
      // Collect customer information for Mailchimp/Supabase
      customer_creation: 'always',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      phone_number_collection: {
        enabled: true,
      },
      
      // Metadata for tracking
      metadata: {
        donation_type: donationType,
        amount: amount.toString(),
      },
    });

    console.log('✅ Checkout session created:', session.id);
    
    res.json({
      id: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to create checkout session' 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`💳 Stripe test mode: ${process.env.STRIPE_SECRET_KEY?.includes('test') ? 'YES' : 'NO'}`);
});

module.exports = app;