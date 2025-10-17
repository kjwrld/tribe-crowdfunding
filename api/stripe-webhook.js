// import type { VercelRequest, VercelResponse } from "@vercel/node";
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

module.exports = async function handler(req/* : VercelRequest */, res/* : VercelResponse */) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Get raw body as string for signature verification
    let body;
    if (Buffer.isBuffer(req.body)) {
        body = req.body.toString('utf8');
    } else if (typeof req.body === 'string') {
        body = req.body;
    } else {
        // Fallback: try to get raw body from chunks
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        await new Promise(resolve => req.on('end', resolve));
        body = Buffer.concat(chunks).toString('utf8');
    }

    const sig = req.headers["stripe-signature"]; // as string
    let event; // : Stripe.Event

    try {
        // Verify webhook signature with raw body
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return res
            .status(400)
            .json({ error: "Webhook signature verification failed" });
    }

    // Handle the event
    
    try {
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object; // as Stripe.Checkout.Session
                await handleCheckoutCompleted(session, event.account);
                break;

            case "payment_intent.succeeded":
                const paymentIntent = event.data.object; // as Stripe.PaymentIntent
                await handlePaymentSucceeded(paymentIntent, event.account);
                break;

            case "invoice.payment_succeeded":
                const invoice = event.data.object; // as Stripe.Invoice
                await handleInvoicePaymentSucceeded(invoice, event.account);
                break;

            default:
                // Unhandled event type
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ error: "Webhook processing failed" });
    }
}

async function handleCheckoutCompleted(session/* : Stripe.Checkout.Session */, connectAccountId) {
    try {
        // Extract data from the actual event object structure
        const customerData = {
            sessionId: session.id,
            paymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
            customerId: typeof session.customer === 'string' ? session.customer : session.customer?.id,
            email: session.customer_details?.email,
            name: session.customer_details?.name,
            phone: session.customer_details?.phone,
            // Use billing address from customer_details (primary) or shipping from collected_information
            address: session.customer_details?.address || session.collected_information?.shipping_details?.address,
            amount: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency?.toUpperCase() || 'USD',
            paymentStatus: session.payment_status === 'paid' ? 'succeeded' : session.payment_status,
            donationType: session.metadata?.donation_type || (session.mode === 'subscription' ? 'monthly' : 'one-time'),
        };

        // Parse name - handle both full name formats
        const nameParts = customerData.name?.trim().split(/\s+/) || [];
        const firstName = nameParts[0] || "Anonymous Donor";
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : null;

        // Save to Supabase
        await saveDonationToSupabase({
            email: customerData.email || "no-email-provided@younggiftedbeautiful.org",
            first_name: firstName,
            last_name: lastName,
            phone: customerData.phone || null,
            address_line1: customerData.address?.line1 || null,
            address_line2: customerData.address?.line2 || null,
            city: customerData.address?.city || null,
            state: customerData.address?.state || null,
            postal_code: customerData.address?.postal_code || null,
            country: customerData.address?.country || null,
            amount: customerData.amount,
            currency: customerData.currency,
            donation_type: customerData.donationType,
            stripe_session_id: customerData.sessionId,
            stripe_payment_intent_id: customerData.paymentIntentId || null,
            stripe_customer_id: customerData.customerId || null,
            card_last_four: null,
            card_brand: null,
            card_exp_month: null,
            card_exp_year: null,
            payment_status: customerData.paymentStatus,
            mailchimp_sent: false,
        });

        // Send to Mailchimp (only if we have a valid email)
        if (customerData.email && customerData.email !== "no-email-provided@younggiftedbeautiful.org") {
            await sendToMailchimp({
                email: customerData.email,
                firstName,
                lastName,
                amount: customerData.amount.toString(),
                phone: customerData.phone,
            });
            
            // Update Supabase to mark email as sent
            await updateDonationMailchimpStatus(customerData.sessionId);
        }
    } catch (error) {
        console.error("Error processing checkout session:", error);
        throw error;
    }
}

async function handlePaymentSucceeded(paymentIntent/* : Stripe.PaymentIntent */, connectAccountId) {
    // Additional processing if needed
}

async function handleInvoicePaymentSucceeded(invoice/* : Stripe.Invoice */, connectAccountId) {
    // Handle recurring subscription payments
}

async function saveDonationToSupabase(donationData/* : any */) {
    const { createClient } = require("@supabase/supabase-js");

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
        console.error("Supabase error:", error);
        throw error;
    }

    return data;
}

async function updateDonationMailchimpStatus(sessionId) {
    const { createClient } = require("@supabase/supabase-js");

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

    const { error } = await supabase
        .from("donations")
        .update({ mailchimp_sent: true })
        .eq("stripe_session_id", sessionId);

    if (error) {
        console.error("Supabase update error:", error);
        throw error;
    }
}

async function sendToMailchimp(donationData/* : any */) {
    // Generate simple thank you email HTML
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You - YGBverse</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; background: #f8f9fa; padding: 40px; border-radius: 10px;">
        <h1 style="color: #4c1d95;">Thank You, ${donationData.firstName}!</h1>
        <p style="font-size: 18px; color: #6b7280;">Your generous $${donationData.amount} donation will help transform STEM education.</p>
        <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #16a34a; font-weight: bold;">Donation Confirmed: $${donationData.amount}</p>
        </div>
        <p>Your donation directly supports STEM programs for underrepresented students.</p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
          This email was sent by YGBVerse. Contact us at info@younggiftedbeautiful.org
        </p>
      </div>
    </body>
    </html>
  `;

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const datacenter = apiKey.split("-")[1];

    // Add to audience
    const mailchimpUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    const subscriberData = {
        email_address: donationData.email,
        status: "subscribed",
        merge_fields: {
            FNAME: donationData.firstName,
            LNAME: donationData.lastName || "",
            AMOUNT: donationData.amount,
            PHONE: donationData.phone || "",
        },
        tags: ["donor"],
    };

    const response = await fetch(mailchimpUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriberData),
    });

    const result = await response.json();

    if (!response.ok) {
        // Handle member already exists - update instead
        if (response.status === 400 && result.title === "Member Exists") {
            const updateUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${donationData.email}`;
            await fetch(updateUrl, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    merge_fields: {
                        FNAME: donationData.firstName,
                        LNAME: donationData.lastName || "",
                        AMOUNT: donationData.amount,
                        PHONE: donationData.phone || "",
                    },
                    tags: ["donor"],
                }),
            });
        } else {
            throw new Error(`MailChimp error: ${result.detail || result.title}`);
        }
    }

    // Always send thank you email (for both new and existing members)
    await sendThankYouEmail(donationData, apiKey, audienceId, datacenter);
}

async function sendThankYouEmail(donationData, apiKey, audienceId, datacenter) {
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You - YGBverse</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; background: #f8f9fa; padding: 40px; border-radius: 10px;">
        <h1 style="color: #4c1d95;">Thank You, ${donationData.firstName}!</h1>
        <p style="font-size: 18px; color: #6b7280;">Your generous $${donationData.amount} donation will help transform STEM education.</p>
        <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #16a34a; font-weight: bold;">Donation Confirmed: $${donationData.amount}</p>
        </div>
        <p>Your donation directly supports STEM programs for underrepresented students.</p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
          This email was sent by YGBVerse. Contact us at info@younggiftedbeautiful.org
        </p>
      </div>
    </body>
    </html>
  `;

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
                        value: donationData.email,
                    },
                ],
            },
        },
        settings: {
            subject_line: `Thank you for your $${donationData.amount} donation!`,
            title: `Thank You - ${donationData.firstName}`,
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

    if (campaignResponse.ok) {
        const campaign = await campaignResponse.json();

        // Set campaign content
        const contentUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns/${campaign.id}/content`;
        await fetch(contentUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                html: emailHTML,
            }),
        });

        // Send campaign
        const sendUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns/${campaign.id}/actions/send`;
        await fetch(sendUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
