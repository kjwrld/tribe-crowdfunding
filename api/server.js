require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3002;

// Connect Account ID (from environment variable)
const CONNECT_ACCOUNT_ID = process.env.STRIPE_CONNECT_ACCOUNT_ID;

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

// Test Connect account and products
app.get('/api/test-connect', async (req, res) => {
  try {
    if (!CONNECT_ACCOUNT_ID) {
      return res.status(400).json({ 
        success: false, 
        error: 'STRIPE_CONNECT_ACCOUNT_ID environment variable not set' 
      });
    }
    
    console.log(`🔍 Testing Connect account: ${CONNECT_ACCOUNT_ID}`);
    
    // Test 1: Get account info
    const account = await stripe.accounts.retrieve(CONNECT_ACCOUNT_ID);
    console.log('✅ Account retrieved:', account.id, account.business_profile?.name || 'No business name');
    
    // Test 2: Get products from Connect account
    const products = await stripe.products.list(
      { limit: 10 },
      { stripeAccount: CONNECT_ACCOUNT_ID }
    );
    console.log(`📦 Found ${products.data.length} products in Connect account`);
    
    // Test 3: Get prices for each product
    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const prices = await stripe.prices.list(
          { product: product.id, limit: 5 },
          { stripeAccount: CONNECT_ACCOUNT_ID }
        );
        return {
          ...product,
          prices: prices.data
        };
      })
    );
    
    res.json({
      success: true,
      account: {
        id: account.id,
        name: account.business_profile?.name || 'No business name',
        email: account.email,
        country: account.country
      },
      products: productsWithPrices.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        active: p.active,
        prices: p.prices.map(price => ({
          id: price.id,
          amount: price.unit_amount,
          currency: price.currency,
          type: price.type,
          recurring: price.recurring
        }))
      }))
    });
    
  } catch (error) {
    console.error('❌ Connect test failed:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message,
      type: error.type,
      code: error.code
    });
  }
});

// Create Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!CONNECT_ACCOUNT_ID) {
      return res.status(500).json({ error: 'Stripe Connect account not configured' });
    }

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
    
    // Create session with Connect account to enable fees
    const session = await stripe.checkout.sessions.create(
      sessionConfig,
      { stripeAccount: CONNECT_ACCOUNT_ID }
    );
    
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
    
    const session = await stripe.checkout.sessions.retrieve(
      session_id,
      { stripeAccount: CONNECT_ACCOUNT_ID }
    );
    
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