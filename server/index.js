const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Create Stripe checkout session
app.post("/api/create-checkout-session", async (req, res) => {
    try {
        const {
            amount,
            donationType = "one-time",
            description,
            currency = "usd",
        } = req.body;

        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: donationType === "monthly" ? "subscription" : "payment",

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
                                  recurring: { interval: "month" },
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

            success_url: `${
                process.env.FRONTEND_URL_DEV || "http://localhost:3000"
            }/?success=true&amount=${amount}&type=${donationType}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${
                process.env.FRONTEND_URL_DEV || "http://localhost:3000"
            }/?canceled=true`,

            // Collect customer information for Mailchimp/Supabase
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
            },
        });

        res.json({
            id: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({
            error: error.message || "Failed to create checkout session",
        });
    }
});

// Fetch real customer data from Stripe session
app.post("/api/get-session-data", async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        // Fetch session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["customer", "payment_intent.payment_method"],
        });

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

        res.json({ success: true, data: customerData });
    } catch (error) {
        console.error("❌ Error fetching session data:", error);
        res.status(500).json({
            error: "Failed to fetch session data",
            message: error.message,
        });
    }
});

// Save donation to Supabase (using service_role key)
app.post("/api/save-donation", async (req, res) => {
    try {
        const donationData = req.body;

        const { createClient } = require("@supabase/supabase-js");

        // Use service_role key to bypass RLS
        const supabase = createClient(
            process.env.VITE_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false,
                },
            }
        );

        const { data, error } = await supabase
            .from("donations")
            .insert([donationData])
            .select()
            .single();

        if (error) {
            console.error("❌ Supabase error:", error);
            throw error;
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error("❌ Error saving donation:", error);
        res.status(500).json({
            error: "Failed to save donation",
            message: error.message,
        });
    }
});

// Mailchimp donation endpoint
app.post("/api/mailchimp/donation", async (req, res) => {
    try {
        const { email, firstName, lastName, amount, phone, emailHTML } =
            req.body;

        if (!email || !firstName || !amount) {
            return res.status(400).json({
                error: "Missing required fields: email, firstName, amount",
            });
        }

        const apiKey = process.env.MAILCHIMP_API_KEY;
        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

        if (!apiKey || !audienceId) {
            console.error("❌ Missing Mailchimp credentials");
            return res.status(500).json({
                error: "Mailchimp not configured",
            });
        }

        // Extract datacenter from API key (e.g., "us6" from key ending in "-us6")
        const datacenter = apiKey.split("-")[1];

        // Add subscriber to Mailchimp audience
        const mailchimpUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

        const subscriberData = {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName || "",
                AMOUNT: amount.toString(),
                PHONE: phone || "",
            },
            tags: ["donor"],
        };

        const mailchimpResponse = await fetch(mailchimpUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subscriberData),
        });

        const mailchimpResult = await mailchimpResponse.json();

        if (!mailchimpResponse.ok) {
            // Check if user already exists (400 error with title "Member Exists")
            if (
                mailchimpResponse.status === 400 &&
                mailchimpResult.title === "Member Exists"
            ) {
                // Update existing member
                const updateUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${email}`;
                const updateResponse = await fetch(updateUrl, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        merge_fields: {
                            FNAME: firstName,
                            LNAME: lastName || "",
                            AMOUNT: amount.toString(),
                            PHONE: phone || "",
                        },
                        tags: ["donor"],
                    }),
                });
            } else {
                console.error("❌ Mailchimp API error:", mailchimpResult);
                throw new Error(
                    `Mailchimp error: ${
                        mailchimpResult.detail || mailchimpResult.title
                    }`
                );
            }
        }

        // Send thank you email if HTML provided
        if (emailHTML) {
            try {
                // console.log(
                //     "📧 Attempting to send thank you email via Mailchimp..."
                // );

                // Create a campaign for this specific donor
                const campaignData = {
                    type: "regular",
                    recipients: {
                        list_id: audienceId,
                        segment_opts: {
                            match: "all",
                            conditions: [
                                {
                                    condition_type: "EmailAddress",
                                    field: "EMAIL",
                                    op: "is",
                                    value: email,
                                },
                            ],
                        },
                    },
                    settings: {
                        subject_line: `Thank you for your $${amount} donation!`,
                        title: `Thank You - ${firstName}`,
                        from_name: "YGBverse",
                        reply_to: "info@younggiftedbeautiful.org",
                        auto_footer: false,
                        inline_css: true,
                    },
                };

                const campaignUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns`;
                const campaignResponse = await fetch(campaignUrl, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(campaignData),
                });

                const campaignResult = await campaignResponse.json();

                if (!campaignResponse.ok) {
                    console.error(
                        "❌ Campaign creation failed:",
                        campaignResult
                    );
                    throw new Error(
                        `Campaign error: ${
                            campaignResult.detail || campaignResult.title
                        }`
                    );
                }

                // console.log("✅ Campaign created:", campaignResult.id);

                // Set campaign content
                const contentUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns/${campaignResult.id}/content`;
                const contentResponse = await fetch(contentUrl, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        html: emailHTML,
                    }),
                });

                if (!contentResponse.ok) {
                    const contentError = await contentResponse.json();
                    // console.error("❌ Content setting failed:", contentError);
                    throw new Error(
                        `Content error: ${
                            contentError.detail || contentError.title
                        }`
                    );
                }

                // console.log("✅ Campaign content set");

                // Send campaign
                const sendUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns/${campaignResult.id}/actions/send`;
                const sendResponse = await fetch(sendUrl, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!sendResponse.ok) {
                    const sendError = await sendResponse.json();
                    console.error("❌ Email send failed:", sendError);
                    throw new Error(
                        `Send error: ${sendError.detail || sendError.title}`
                    );
                }

                // console.log("✅ Thank you email sent successfully!");
            } catch (emailError) {
                // console.error("❌ Email sending failed:", emailError);
                // Don't fail the whole request if email fails
            }
        }

        res.json({
            success: true,
            message: "Donor added to audience successfully!",
        });
    } catch (error) {
        console.error("❌ Mailchimp donation API error:", error);
        res.status(500).json({
            error: "Failed to process donation with Mailchimp",
            message: error.message,
        });
    }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    // console.log(`🚀 Local API server running on http://localhost:${PORT}`);
    // console.log(
    //     `💳 Stripe test mode: ${
    //         process.env.STRIPE_SECRET_KEY?.includes("test") ? "YES" : "NO"
    //     }`
    // );
});

module.exports = app;
