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
        const {
            amount,
            donationType,
            description,
            currency = "usd",
            productId,
        } = req.body;

        if (!amount || !donationType) {
            return res.status(400).json({
                error: "Missing required fields: amount, donationType",
            });
        }

        // console.log("Creating checkout session:", {
        //     amount,
        //     donationType,
        //     description,
        // });

        // Determine the success URL based on donation type
        const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:5173";

        const successUrl = `${baseUrl}/?success=true&amount=${amount}&type=${donationType}&session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${baseUrl}/?canceled=true`;

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: donationType === "monthly" ? "subscription" : "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,

            // Line items
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name:
                                description ||
                                `YGBverse ${
                                    donationType === "monthly"
                                        ? "Monthly"
                                        : "One-Time"
                                } Donation`,
                            description:
                                "Supporting STEM education for underrepresented students",
                        },
                        ...(donationType === "monthly"
                            ? {
                                  recurring: {
                                      interval: "month",
                                  },
                                  unit_amount: Math.round(amount * 100), // Convert to cents
                              }
                            : {
                                  unit_amount: Math.round(amount * 100), // Convert to cents
                              }),
                    },
                    quantity: 1,
                },
            ],

            // Stripe Connect configuration
            ...(donationType === "one-time" ? {
                // One-time payment: Use payment_intent_data
                payment_intent_data: {
                    application_fee_amount: Math.round(amount * 100 * 0.05), // 5% platform fee
                    transfer_data: {
                        destination: process.env.STRIPE_CONNECT_ACCOUNT_ID,
                    },
                },
            } : {
                // Monthly subscription: Use subscription_data
                subscription_data: {
                    application_fee_percent: 5, // 5% platform fee
                    on_behalf_of: process.env.STRIPE_CONNECT_ACCOUNT_ID,
                    transfer_data: {
                        destination: process.env.STRIPE_CONNECT_ACCOUNT_ID,
                    },
                },
            }),

            // Collect customer information
            customer_creation: "always",
            billing_address_collection: "required",
            shipping_address_collection: {
                allowed_countries: ["US", "CA"],
            },
            phone_number_collection: {
                enabled: true,
            },

            // Metadata for tracking
            metadata: {
                donation_type: donationType,
                amount: amount.toString(),
                product_id: productId || "one-time",
            },

            // Automatic tax calculation (optional)
            automatic_tax: {
                enabled: false, // Set to true if you want to collect tax
            },
        });

        // console.log("Checkout session created successfully:", session.id);

        return res.status(200).json({
            id: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        console.error("Error details:", {
            message: error?.message,
            stack: error?.stack,
            donationType,
            amount,
            connectAccountId: process.env.STRIPE_CONNECT_ACCOUNT_ID
        });

        if (error instanceof Stripe.errors.StripeError) {
            return res.status(400).json({
                error: `Stripe error: ${error.message}`,
                type: error.type,
                details: error.detail || null,
            });
        }

        return res.status(500).json({
            error: "Internal server error while creating checkout session",
            message: error?.message || "Unknown error",
        });
    }
}
