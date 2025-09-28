const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const CONNECT_ACCOUNT_ID = process.env.STRIPE_CONNECT_ACCOUNT_ID;

export default async function handler(req, res) {
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

  try {
    if (!CONNECT_ACCOUNT_ID) {
      return res.status(500).json({ error: 'Stripe Connect account not configured' });
    }

    const { 
      amount, 
      currency = 'usd', 
      description = 'YGBverse Donation', 
      donationType = 'one-time',
      productId = null
    } = req.body;

    console.log('Creating checkout session:', { amount, donationType, description, productId });

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const sessionConfig = {
      payment_method_types: ['card'],
      success_url: `${req.headers.origin || 'https://tribe-fundraiser-final.vercel.app'}/?success=true&session_id={CHECKOUT_SESSION_ID}&amount=${amount}&type=${donationType}`,
      cancel_url: `${req.headers.origin || 'https://tribe-fundraiser-final.vercel.app'}/?canceled=true`,
      metadata: {
        donationType,
        originalAmount: amount.toString()
      }
    };

    if (donationType === 'monthly') {
      // Create subscription
      sessionConfig.mode = 'subscription';
      sessionConfig.line_items = [{
        price_data: {
          currency: currency,
          product_data: { 
            name: 'Monthly YGBverse Donation',
            description: 'Monthly donation to support STEM education through YGBverse'
          },
          unit_amount: parseInt(amount) * 100,
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
          unit_amount: parseInt(amount) * 100,
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
}