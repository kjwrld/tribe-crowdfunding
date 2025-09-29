require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Function to test product existence and details
async function testStripeProduct(productId) {
  try {
    console.log(`Testing product: ${productId}`);
    const product = await stripe.products.retrieve(productId);
    
    console.log(`✅ Product found: ${product.name}`);
    console.log(`   Status: ${product.active ? 'Active' : 'Inactive'}`);
    console.log(`   Created: ${new Date(product.created * 1000).toISOString()}`);
    console.log(`   Description: ${product.description || 'No description'}`);
    
    return {
      success: true,
      product: product,
      active: product.active
    };
  } catch (error) {
    console.log(`❌ Product error: ${error.message}`);
    return {
      success: false,
      error: error.message,
      error_code: error.code,
      error_type: error.type
    };
  }
}

// Function to test creating a checkout session with the product
async function testCheckoutSession(productId, amount = 200) {
  try {
    console.log(`Testing checkout session with product: ${productId}, amount: $${amount}`);
    
    const sessionConfig = {
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product: productId,
          unit_amount: amount * 100, // Convert to cents
        },
        quantity: 1,
      }],
      success_url: 'http://localhost:3001/?success=true',
      cancel_url: 'http://localhost:3001/?canceled=true',
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);
    
    console.log(`✅ Checkout session created: ${session.id}`);
    console.log(`   URL: ${session.url}`);
    
    return {
      success: true,
      session_id: session.id,
      checkout_url: session.url
    };
  } catch (error) {
    console.log(`❌ Checkout session error: ${error.message}`);
    return {
      success: false,
      error: error.message,
      error_code: error.code,
      error_type: error.type
    };
  }
}

// Function to list all products in the account
async function listStripeProducts(limit = 10) {
  try {
    console.log(`Listing up to ${limit} products in your Stripe account...`);
    const products = await stripe.products.list({ limit });
    
    console.log(`\n📦 Found ${products.data.length} products:`);
    products.data.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.id} - ${product.name} (${product.active ? 'Active' : 'Inactive'})`);
    });
    
    return {
      success: true,
      products: products.data,
      total_count: products.data.length
    };
  } catch (error) {
    console.log(`❌ List products error: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to test account access and environment
async function testStripeAccount() {
  try {
    console.log('Testing Stripe account access...');
    const account = await stripe.accounts.retrieve();
    
    const isLive = !process.env.STRIPE_SECRET_KEY.includes('test');
    console.log(`✅ Account access successful`);
    console.log(`   Account ID: ${account.id}`);
    console.log(`   Country: ${account.country}`);
    console.log(`   Environment: ${isLive ? 'LIVE' : 'TEST'}`);
    console.log(`   API Key prefix: ${process.env.STRIPE_SECRET_KEY.substring(0, 12)}...`);
    
    return {
      success: true,
      account_id: account.id,
      country: account.country,
      environment: isLive ? 'live' : 'test',
      api_key_prefix: process.env.STRIPE_SECRET_KEY.substring(0, 12)
    };
  } catch (error) {
    console.log(`❌ Account access error: ${error.message}`);
    return {
      success: false,
      error: error.message,
      api_key_prefix: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 12) : 'Not set'
    };
  }
}

// Main test function
async function testStripeIntegration() {
  try {
    console.log('🧪 Starting Stripe integration test...\n');
    
    const results = {
      timestamp: new Date().toISOString(),
      tests: {}
    };

    // Test 1: Account access
    console.log('1️⃣ Testing account access...');
    results.tests.account = await testStripeAccount();
    console.log();

    // Test 2: List products
    console.log('2️⃣ Listing products...');
    results.tests.products_list = await listStripeProducts();
    console.log();

    // Test 3: Test specific product
    console.log('3️⃣ Testing specific product...');
    const productId = 'prod_T4fZSmo5mQHFDc';
    results.tests.specific_product = await testStripeProduct(productId);
    console.log();

    // Test 4: Test checkout session creation (only if product exists)
    console.log('4️⃣ Testing checkout session creation...');
    if (results.tests.specific_product.success && results.tests.specific_product.active) {
      results.tests.checkout_session = await testCheckoutSession(productId);
    } else {
      console.log(`⏭️  Skipping checkout test - product ${productId} not found or inactive`);
      results.tests.checkout_session = {
        success: false,
        skipped: true,
        reason: 'Product not found or inactive'
      };
    }
    console.log();

    // Test 5: Test creating a dynamic product (fallback approach)
    console.log('5️⃣ Testing dynamic product creation...');
    try {
      const sessionConfig = {
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'YGBverse Test Donation',
              description: 'Test donation for YGBverse STEM education'
            },
            unit_amount: 20000, // $200 in cents
          },
          quantity: 1,
        }],
        success_url: 'http://localhost:3001/?success=true',
        cancel_url: 'http://localhost:3001/?canceled=true',
      };

      const session = await stripe.checkout.sessions.create(sessionConfig);
      console.log(`✅ Dynamic product checkout session created: ${session.id}`);
      
      results.tests.dynamic_product = {
        success: true,
        session_id: session.id,
        checkout_url: session.url
      };
    } catch (error) {
      console.log(`❌ Dynamic product error: ${error.message}`);
      results.tests.dynamic_product = {
        success: false,
        error: error.message
      };
    }
    
    console.log('\n📊 Test Summary:');
    console.log(`   Account Access: ${results.tests.account.success ? '✅' : '❌'}`);
    console.log(`   Products List: ${results.tests.products_list.success ? '✅' : '❌'}`);
    console.log(`   Specific Product: ${results.tests.specific_product.success ? '✅' : '❌'}`);
    console.log(`   Checkout Session: ${results.tests.checkout_session.success ? '✅' : results.tests.checkout_session.skipped ? '⏭️' : '❌'}`);
    console.log(`   Dynamic Product: ${results.tests.dynamic_product.success ? '✅' : '❌'}`);
    
    return results;
    
  } catch (error) {
    console.error('❌ Stripe test error:', error);
    return { 
      success: false, 
      error: error.message,
      stripe_config: {
        api_key_set: !!process.env.STRIPE_SECRET_KEY,
        api_key_prefix: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 12) : 'Not set'
      }
    };
  }
}

// Export for use in other files
module.exports = {
  testStripeProduct,
  testCheckoutSession,
  listStripeProducts,
  testStripeAccount,
  testStripeIntegration
};

// Run test if called directly
if (require.main === module) {
  testStripeIntegration()
    .then(result => {
      console.log('\n🔍 Full test results:');
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(error => console.error('Test failed:', error));
}