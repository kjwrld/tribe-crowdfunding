import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
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
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutCompleted(session);
                break;

            case "payment_intent.succeeded":
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await handlePaymentSucceeded(paymentIntent);
                break;

            case "invoice.payment_succeeded":
                const invoice = event.data.object as Stripe.Invoice;
                await handleInvoicePaymentSucceeded(invoice);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ error: "Webhook processing failed" });
    }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    console.log("Processing completed checkout session:", session.id);

    try {
        // Get expanded session data
        const expandedSession = await stripe.checkout.sessions.retrieve(
            session.id,
            {
                expand: ["customer", "payment_intent.payment_method"],
            }
        );

        // Extract customer data
        const customerData = {
            sessionId: expandedSession.id,
            paymentIntentId: expandedSession.payment_intent?.id,
            customerId:
                expandedSession.customer?.id || expandedSession.customer,
            email: expandedSession.customer_details?.email,
            name: expandedSession.customer_details?.name,
            phone: expandedSession.customer_details?.phone,
            address: expandedSession.customer_details?.address,
            amount: expandedSession.amount_total! / 100,
            currency: expandedSession.currency?.toUpperCase(),
            paymentStatus: expandedSession.payment_status,
            cardLast4: (expandedSession.payment_intent as any)?.payment_method
                ?.card?.last4,
            cardBrand: (expandedSession.payment_intent as any)?.payment_method
                ?.card?.brand,
            cardExpMonth: (expandedSession.payment_intent as any)
                ?.payment_method?.card?.exp_month,
            cardExpYear: (expandedSession.payment_intent as any)?.payment_method
                ?.card?.exp_year,
        };

        // Parse name
        const nameParts = customerData.name?.split(" ") || [];
        const firstName = nameParts[0] || "Anonymous Donor";
        const lastName = nameParts.slice(1).join(" ") || undefined;

        // Save to Supabase
        await saveDonationToSupabase({
            email:
                customerData.email ||
                "no-email-provided@younggiftedbeautiful.org",
            first_name: firstName,
            last_name: lastName,
            phone: customerData.phone,
            address_line1: customerData.address?.line1,
            address_line2: customerData.address?.line2,
            city: customerData.address?.city,
            state: customerData.address?.state,
            postal_code: customerData.address?.postal_code,
            country: customerData.address?.country,
            amount: customerData.amount,
            currency: customerData.currency || "USD",
            donation_type: "one-time",
            stripe_session_id: customerData.sessionId,
            stripe_payment_intent_id: customerData.paymentIntentId,
            stripe_customer_id: customerData.customerId,
            card_last_four: customerData.cardLast4,
            card_brand: customerData.cardBrand,
            card_exp_month: customerData.cardExpMonth?.toString(),
            card_exp_year: customerData.cardExpYear?.toString(),
            payment_status: "succeeded",
            mailchimp_sent: false,
        });

        // Send to Mailchimp
        await sendToMailchimp({
            email: customerData.email!,
            firstName,
            lastName,
            amount: customerData.amount.toString(),
            phone: customerData.phone,
        });

        console.log("Successfully processed checkout session:", session.id);
    } catch (error) {
        console.error("Error processing checkout session:", error);
        throw error;
    }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    console.log("Payment succeeded:", paymentIntent.id);
    // Additional processing if needed
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
    console.log("Invoice payment succeeded:", invoice.id);
    // Handle recurring subscription payments
}

async function saveDonationToSupabase(donationData: any) {
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

    console.log("Saved donation to Supabase:", data.id);
    return data;
}

async function sendToMailchimp(donationData: any) {
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
    const datacenter = apiKey!.split("-")[1];

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

    await fetch(mailchimpUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriberData),
    });

    console.log("Added donor to Mailchimp audience");
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "1mb",
        },
    },
};
