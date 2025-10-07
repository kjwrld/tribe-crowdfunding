export default function handler(req, res) {
    return res.status(200).json({
        method: req.method,
        body: req.body,
        hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
        stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 12),
        hasExplorerPrice: !!process.env.STRIPE_PRICE_EXPLORER_MONTHLY,
        hasSeamerPrice: !!process.env.STRIPE_PRICE_STEAMER_MONTHLY,
        hasYgberPrice: !!process.env.STRIPE_PRICE_YGBER_MONTHLY,
        explorerPrice: process.env.STRIPE_PRICE_EXPLORER_MONTHLY,
        steamerPrice: process.env.STRIPE_PRICE_STEAMER_MONTHLY,
        ygberPrice: process.env.STRIPE_PRICE_YGBER_MONTHLY
    });
}