const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const CONNECT_ACCOUNT_ID = process.env.STRIPE_CONNECT_ACCOUNT_ID;

module.exports = async function handler(req, res) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Debug environment variables
    console.log('Environment check:', {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      hasConnectAccount: !!CONNECT_ACCOUNT_ID,
      hasProductOneTime: !!process.env.STRIPE_PRODUCT_ONE_TIME
    });

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY');
      return res.status(500).json({ error: 'Stripe not configured - missing secret key' });
    }

    if (!CONNECT_ACCOUNT_ID) {
      console.error('Missing STRIPE_CONNECT_ACCOUNT_ID');
      return res.status(500).json({ error: 'Stripe Connect account not configured' });
    }

    const { 
      amount, 
      currency = 'usd', 
      description = 'YGBverse Donation', 
      donationType = 'one-time',
      productId = null,
      priceId = null
    } = req.body;

    console.log('Creating checkout session:', { amount, donationType, description, productId, priceId });

    // Define product and price mappings using environment variables
    const PRODUCT_MAPPINGS = {
      // Recurring subscription products with fixed prices
      'explorer': {
        productId: process.env.STRIPE_PRODUCT_EXPLORER,
        priceId: process.env.STRIPE_PRICE_EXPLORER_MONTHLY,
        amount: 200
      },
      'steamer': {
        productId: process.env.STRIPE_PRODUCT_STEAMER, 
        priceId: process.env.STRIPE_PRICE_STEAMER_MONTHLY,
        amount: 600
      },
      'ygber': {
        productId: process.env.STRIPE_PRODUCT_YGBER,
        priceId: process.env.STRIPE_PRICE_YGBER_MONTHLY, 
        amount: 1000
      },
      // Variable amount one-time product
      'one-time': {
        productId: process.env.STRIPE_PRODUCT_ONE_TIME,
        priceId: process.env.STRIPE_PRICE_ONE_TIME_VARIABLE
      }
    };

    const sessionConfig = {
      payment_method_types: ['card'],
      success_url: `${req.headers.origin || 'https://tribe-fundraiser-final.vercel.app'}/?success=true&session_id={CHECKOUT_SESSION_ID}&amount=${amount}&type=${donationType}`,
      cancel_url: `${req.headers.origin || 'https://tribe-fundraiser-final.vercel.app'}/?canceled=true`,
      metadata: {
        donationType,
        originalAmount: amount.toString()
      }
    };

    // Use existing price ID if provided
    if (priceId) {
      sessionConfig.mode = donationType === 'monthly' ? 'subscription' : 'payment';
      sessionConfig.line_items = [{
        price: priceId,
        quantity: 1,
      }];
    }
    // Use product mapping if productId matches predefined products
    else if (productId && PRODUCT_MAPPINGS[productId]) {
      const mapping = PRODUCT_MAPPINGS[productId];
      if (mapping.priceId && (donationType === 'monthly' || productId !== 'one-time')) {
        // Use existing price for recurring or predefined amounts
        sessionConfig.mode = donationType === 'monthly' ? 'subscription' : 'payment';
        sessionConfig.line_items = [{
          price: mapping.priceId,
          quantity: 1,
        }];
      } else {
        // Use variable pricing for one-time donations
        sessionConfig.mode = 'payment';
        sessionConfig.line_items = [{
          price_data: {
            currency: currency,
            product: mapping.productId,
            unit_amount: parseInt(amount) * 100,
          },
          quantity: 1,
        }];
      }
    }
    // For one-time donations without specific product, use the variable price product
    else if (donationType === 'one-time') {
      // Validate amount for one-time donations
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount for one-time donation' });
      }
      
      sessionConfig.mode = 'payment';
      sessionConfig.line_items = [{
        price_data: {
          currency: currency,
          product: PRODUCT_MAPPINGS['one-time'].productId,
          unit_amount: parseInt(amount) * 100,
        },
        quantity: 1,
      }];
    }
    // Handle specific amount-based product selection
    else if (amount) {
      let selectedProduct = 'one-time';
      if (donationType === 'monthly') {
        if (amount >= 1000) selectedProduct = 'ygber';
        else if (amount >= 600) selectedProduct = 'steamer'; 
        else if (amount >= 200) selectedProduct = 'explorer';
      }
      
      const mapping = PRODUCT_MAPPINGS[selectedProduct];
      if (donationType === 'monthly' && mapping.priceId) {
        sessionConfig.mode = 'subscription';
        sessionConfig.line_items = [{
          price: mapping.priceId,
          quantity: 1,
        }];
      } else {
        sessionConfig.mode = 'payment';
        sessionConfig.line_items = [{
          price_data: {
            currency: currency,
            product: mapping.productId,
            unit_amount: parseInt(amount) * 100,
          },
          quantity: 1,
        }];
      }
    }
    else {
      return res.status(400).json({ error: 'Invalid product or amount specified' });
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
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: error.message,
      details: 'Failed to create checkout session',
      code: error.code || 'UNKNOWN_ERROR'
    });
  }
  } catch (outerError) {
    console.error('Outer catch - critical error:', outerError);
    console.error('Outer error stack:', outerError.stack);
    return res.status(500).json({
      error: 'Critical server error',
      message: outerError.message
    });
  }
}