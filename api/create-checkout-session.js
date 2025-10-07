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

        // Map tier names to existing Stripe price IDs for monthly subscriptions
        const getLineItems = () => {
            if (donationType === "monthly") {
                const numAmount = parseInt(amount);
                
                switch (numAmount) {
                    case 199:
                        return [{ price: process.env.STRIPE_PRICE_EXPLORER_MONTHLY, quantity: 1 }];
                    case 599:
                        return [{ price: process.env.STRIPE_PRICE_STEAMER_MONTHLY, quantity: 1 }];
                    case 999:
                        return [{ price: process.env.STRIPE_PRICE_YGBER_MONTHLY, quantity: 1 }];
                    default:
                        // Custom amount - use price_data
                        return [{
                            price_data: {
                                currency: currency,
                                product_data: {
                                    name: description || `YGBverse Monthly Donation`,
                                    description: "Supporting STEM education for underrepresented students",
                                },
                                recurring: { interval: "month" },
                                unit_amount: Math.round(amount * 100),
                            },
                            quantity: 1,
                        }];
                }
            } else {
                // One-time payment - use price_data for custom amounts
                return [{
                    price_data: {
                        currency: currency,
                        product: process.env.STRIPE_PRODUCT_ONE_TIME,
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                }];
            }
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: donationType === "monthly" ? "subscription" : "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: getLineItems(),

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
        }, {
            stripeAccount: process.env.STRIPE_CONNECT_ACCOUNT_ID
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