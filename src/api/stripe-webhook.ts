import Stripe from "stripe";
import {
    insertDonation,
    updateDonation,
    getDonationBySessionId,
} from "../lib/supabase";
import { DonationData } from "../hooks/useMailchimp";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
});

const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

export async function handleStripeWebhook(request: Request): Promise<Response> {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
        if (!endpointSecret) {
            throw new Error("Stripe webhook secret not configured");
        }
        event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return new Response(
            `Webhook Error: ${
                err instanceof Error ? err.message : "Unknown error"
            }`,
            {
                status: 400,
            }
        );
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            await handleCheckoutSessionCompleted(
                event.data.object as Stripe.Checkout.Session
            );
            break;
        case "payment_intent.succeeded":
            await handlePaymentIntentSucceeded(
                event.data.object as Stripe.PaymentIntent
            );
            break;
        case "customer.subscription.created":
            await handleSubscriptionCreated(
                event.data.object as Stripe.Subscription
            );
            break;
        case "invoice.payment_succeeded":
            await handleInvoicePaymentSucceeded(
                event.data.object as Stripe.Invoice
            );
            break;
        default:
        // console.log(`Unhandled event type ${event.type}`);
    }

    return new Response("Success", { status: 200 });
}

async function handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session
) {
    try {
        // console.log("Processing checkout session:", session.id);

        // Get customer details from Stripe
        const customer = session.customer_details;
        if (!customer?.email) {
            // console.error("No customer email found in session");
            return;
        }

        // Determine donation type
        const isSubscription = session.mode === "subscription";
        const amount = session.amount_total
            ? (session.amount_total / 100).toString()
            : "0";

        // Extract customer info
        const firstName = customer.name?.split(" ")[0] || "";
        const lastName = customer.name?.split(" ").slice(1).join(" ") || "";

        // Prepare donation record
        const donationRecord = {
            email: customer.email,
            first_name: firstName,
            last_name: lastName,
            phone: customer.phone || undefined,
            address_line1: customer.address?.line1 || undefined,
            address_line2: customer.address?.line2 || undefined,
            city: customer.address?.city || undefined,
            state: customer.address?.state || undefined,
            postal_code: customer.address?.postal_code || undefined,
            country: customer.address?.country || undefined,
            amount: parseFloat(amount),
            currency: session.currency?.toUpperCase() || "USD",
            donation_type: isSubscription
                ? ("monthly" as const)
                : ("one-time" as const),
            stripe_session_id: session.id,
            stripe_customer_id:
                typeof session.customer === "string"
                    ? session.customer
                    : undefined,
            payment_status:
                session.payment_status === "paid"
                    ? ("succeeded" as const)
                    : ("pending" as const),
            mailchimp_sent: false,
        };

        // Insert donation record
        const donation = await insertDonation(donationRecord);
        // console.log("Donation record created:", donation.id);

        // Send thank you email via Mailchimp
        if (donation && customer.email) {
            try {
                const donationData: DonationData = {
                    firstName,
                    lastName,
                    email: customer.email,
                    amount,
                    type: isSubscription ? "monthly" : "one-time",
                    phone: customer.phone || undefined,
                    address: customer.address?.line1 || undefined,
                };

                // This would trigger the Mailchimp thank you email
                // We'll implement this in the next step
                // console.log("Would send thank you email for:", donationData);

                // Update donation record to mark email as sent
                await updateDonation(donation.id, { mailchimp_sent: true });
            } catch (emailError) {
                // console.error("Failed to send thank you email:", emailError);
            }
        }
    } catch (error) {
        // console.error("Error handling checkout session completed:", error);
    }
}

async function handlePaymentIntentSucceeded(
    paymentIntent: Stripe.PaymentIntent
) {
    try {
        // console.log("Processing payment intent:", paymentIntent.id);

        // Try to find existing donation by payment intent
        const donation = await getDonationBySessionId(paymentIntent.id);

        if (donation) {
            // Get payment method details
            let cardInfo = {};
            if (paymentIntent.charges.data[0]?.payment_method_details?.card) {
                const card =
                    paymentIntent.charges.data[0].payment_method_details.card;
                cardInfo = {
                    card_last_four: card.last4,
                    card_brand: card.brand,
                };
            }

            // Update donation with payment details
            await updateDonation(donation.id, {
                stripe_payment_intent_id: paymentIntent.id,
                payment_status: "succeeded",
                ...cardInfo,
            });

            // console.log("Updated donation with payment details:", donation.id);
        }
    } catch (error) {
        // console.error("Error handling payment intent succeeded:", error);
    }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
    try {
        // console.log("Processing subscription created:", subscription.id);
        // Handle subscription-specific logic here if needed
    } catch (error) {
        // console.error("Error handling subscription created:", error);
    }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
    try {
        // console.log('Processing invoice payment succeeded:', invoice.id);
        // Handle recurring payment logic here if needed
    } catch (error) {
        console.error("Error handling invoice payment succeeded:", error);
    }
}
