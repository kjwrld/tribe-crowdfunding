const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const {
            amount,
            donationType,
            description,
            currency = "usd",
        } = req.body;

        if (!amount || !donationType) {
            return res.status(400).json({
                error: "Missing required fields: amount, donationType",
            });
        }

        const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "https://tribe-fundraiser.vercel.app";

        const successUrl = `${baseUrl}/?success=true&amount=${amount}&type=${donationType}&session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${baseUrl}/?canceled=true`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: donationType === "monthly" ? "subscription" : "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,

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
                                  unit_amount: Math.round(amount * 100),
                              }
                            : {
                                  unit_amount: Math.round(amount * 100),
                              }),
                    },
                    quantity: 1,
                },
            ],

            // Stripe Connect configuration
            ...(donationType === "one-time" ? {
                payment_intent_data: {
                    application_fee_amount: Math.round(amount * 100 * 0.05),
                    transfer_data: {
                        destination: process.env.STRIPE_CONNECT_ACCOUNT_ID,
                    },
                },
            } : {
                subscription_data: {
                    application_fee_percent: 5,
                    on_behalf_of: process.env.STRIPE_CONNECT_ACCOUNT_ID,
                    transfer_data: {
                        destination: process.env.STRIPE_CONNECT_ACCOUNT_ID,
                    },
                },
            }),

            customer_creation: "always",
            billing_address_collection: "required",
            shipping_address_collection: {
                allowed_countries: ["US", "CA"],
            },
            phone_number_collection: {
                enabled: true,
            },

            metadata: {
                donation_type: donationType,
                amount: amount.toString(),
            },
        });

        return res.status(200).json({
            id: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return res.status(500).json({
            error: "Internal server error while creating checkout session",
            message: error?.message || "Unknown error",
        });
    }
}