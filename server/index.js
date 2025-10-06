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
      
      success_url: `http://localhost:3000/?success=true&amount=${amount}&type=${donationType}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/?canceled=true`,
      
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

// Fetch real customer data from Stripe session
app.post('/api/get-session-data', async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    console.log('🔍 Fetching Stripe session data for:', sessionId);
    
    // Fetch session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent.payment_method']
    });
    
    console.log('✅ Stripe session retrieved:', {
      id: session.id,
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
      payment_status: session.payment_status
    });
    
    // Extract customer data
    const customerData = {
      sessionId: session.id,
      paymentIntentId: session.payment_intent?.id,
      customerId: session.customer?.id || session.customer,
      email: session.customer_details?.email,
      name: session.customer_details?.name,
      phone: session.customer_details?.phone,
      address: session.customer_details?.address,
      amount: session.amount_total / 100, // Convert from cents
      currency: session.currency.toUpperCase(),
      paymentStatus: session.payment_status,
      // Card details from payment method
      cardLast4: session.payment_intent?.payment_method?.card?.last4,
      cardBrand: session.payment_intent?.payment_method?.card?.brand,
      cardExpMonth: session.payment_intent?.payment_method?.card?.exp_month,
      cardExpYear: session.payment_intent?.payment_method?.card?.exp_year,
    };
    
    console.log('📋 Extracted customer data:', customerData);
    
    res.json({ success: true, data: customerData });
    
  } catch (error) {
    console.error('❌ Error fetching session data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch session data',
      message: error.message 
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