require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3002;

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow localhost and your deployment domains
    if (!origin || 
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.includes('vercel.app') ||
        origin.includes('your-domain.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Stripe API server is running' });
});

// Create Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { 
      amount, 
      currency = 'usd', 
      description = 'YGBverse Donation', 
      donationType = 'one-time',
      productId = null // Optional existing product ID
    } = req.body;

    console.log('Creating checkout session:', { amount, donationType, description, productId });

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const sessionConfig = {
      payment_method_types: ['card'],
      success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}&amount=${amount}&type=${donationType}`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
      metadata: {
        donationType,
        originalAmount: amount.toString()
      }
    };

    if (productId) {
      // Use existing product with custom amount
      console.log('Using existing product ID:', productId);
      if (donationType === 'monthly') {
        // Create subscription with existing product
        sessionConfig.mode = 'subscription';
        sessionConfig.line_items = [{
          price_data: {
            currency: currency,
            product: productId, // Use existing product
            unit_amount: parseInt(amount) * 100, // Convert to cents
            recurring: { interval: 'month' },
          },
          quantity: 1,
        }];
      } else {
        // Create one-time payment with existing product
        sessionConfig.mode = 'payment';
        sessionConfig.line_items = [{
          price_data: {
            currency: currency,
            product: productId, // Use existing product
            unit_amount: parseInt(amount) * 100, // Convert to cents
          },
          quantity: 1,
        }];
      }
    } else if (donationType === 'monthly') {
      // Create subscription
      sessionConfig.mode = 'subscription';
      sessionConfig.line_items = [{
        price_data: {
          currency: currency,
          product_data: { 
            name: 'Monthly YGBverse Donation',
            description: 'Monthly donation to support STEM education through YGBverse'
          },
          unit_amount: parseInt(amount) * 100, // Convert to cents
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }];
    } else {
      // Create one-time payment
      sessionConfig.mode = 'payment';
      sessionConfig.line_items = [{
        price_data: {
          currency: currency,
          product_data: { 
            name: 'YGBverse Donation',
            description: `One-time donation to support STEM education through YGBverse - $${amount}`
          },
          unit_amount: parseInt(amount) * 100, // Convert to cents
        },
        quantity: 1,
      }];
    }
    
    const session = await stripe.checkout.sessions.create(sessionConfig);
    
    console.log('Checkout session created:', session.id);
    res.json({ 
      id: session.id, 
      url: session.url,
      amount: amount,
      type: donationType
    });
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Failed to create checkout session'
    });
  }
});

// Verify payment completion
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { session_id } = req.body;
    
    if (!session_id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status === 'paid') {
      const customer = session.customer ? await stripe.customers.retrieve(session.customer) : null;
      
      res.json({ 
        success: true, 
        customer_email: customer?.email,
        amount: session.amount_total / 100,
        currency: session.currency,
        payment_status: session.payment_status,
        donation_type: session.metadata?.donationType || 'one-time'
      });
    } else {
      res.json({ 
        success: false, 
        message: 'Payment not completed',
        payment_status: session.payment_status
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Failed to verify payment'
    });
  }
});

// Get donation statistics (optional)
app.get('/api/donation-stats', async (req, res) => {
  try {
    // This would typically come from your database
    // For now, return mock data
    res.json({
      totalDonations: 0,
      totalAmount: 0,
      currency: 'usd',
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting donation stats:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Stripe API server running on port ${PORT}`);
  console.log(`📧 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💳 Stripe account: ${process.env.STRIPE_SECRET_KEY ? 'Connected' : 'NOT CONFIGURED'}`);
});