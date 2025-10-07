import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    return res.status(200).json({
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        hasConnectAccount: !!process.env.STRIPE_CONNECT_ACCOUNT_ID,
        hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
        hasMailchimpKey: !!process.env.MAILCHIMP_API_KEY,
        stripeKeyLength: process.env.STRIPE_SECRET_KEY?.length || 0,
        nodeVersion: process.version,
    });
}