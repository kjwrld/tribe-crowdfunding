import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        // console.log('🔍 Fetching Stripe session data for:', sessionId);

        // Fetch session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["customer", "payment_intent.payment_method"],
        });

        // console.log("✅ Stripe session retrieved:", {
        //     id: session.id,
        //     customer_email: session.customer_details?.email,
        //     customer_name: session.customer_details?.name,
        //     payment_status: session.payment_status,
        // });

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
            cardExpMonth:
                session.payment_intent?.payment_method?.card?.exp_month,
            cardExpYear: session.payment_intent?.payment_method?.card?.exp_year,
        };

        // console.log("📋 Extracted customer data:", customerData);

        res.json({ success: true, data: customerData });
    } catch (error: any) {
        console.error("❌ Error fetching session data:", error);
        res.status(500).json({
            error: "Failed to fetch session data",
            message: error.message,
        });
    }
}
