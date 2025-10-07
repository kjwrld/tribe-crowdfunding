export default function handler(req, res) {
    return res.status(200).json({
        message: "Simple test works",
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    });
}