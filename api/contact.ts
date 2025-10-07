import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                error: "Missing required fields: name, email, subject, message",
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

        console.log('📧 Adding contact to Mailchimp:', { email, name });

        // Add subscriber to Mailchimp audience
        const mailchimpUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

        const subscriberData = {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: name.split(' ')[0] || name,
                LNAME: name.split(' ').slice(1).join(' ') || "",
            },
            tags: ["contact"],
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
                console.log("📧 Contact already in audience, updating tags...");

                // Update existing member with contact tag
                const updateUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${email}`;
                const updateResponse = await fetch(updateUrl, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        merge_fields: {
                            FNAME: name.split(' ')[0] || name,
                            LNAME: name.split(' ').slice(1).join(' ') || "",
                        },
                        tags: ["contact"],
                    }),
                });

                if (updateResponse.ok) {
                    console.log("✅ Updated existing contact in Mailchimp");
                }
            } else {
                console.error("❌ Mailchimp API error:", mailchimpResult);
                throw new Error(
                    `Mailchimp error: ${
                        mailchimpResult.detail || mailchimpResult.title
                    }`
                );
            }
        } else {
            console.log("✅ Added new contact to Mailchimp audience");
        }

        // Send email to info@younggiftedbeautiful.com using Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        
        if (resendApiKey) {
            console.log('📧 Sending contact message email...');
            
            const emailHtml = `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                    ${message.replace(/\n/g, '<br>')}
                </div>
                <hr>
                <p style="color: #666; font-size: 12px;">
                    This message was sent from the contact form on younggiftedbeautiful.com
                </p>
            `;

            const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'contact@younggiftedbeautiful.com',
                    to: ['info@younggiftedbeautiful.com'],
                    subject: `Contact Form: ${subject}`,
                    html: emailHtml,
                    reply_to: email,
                }),
            });

            if (resendResponse.ok) {
                console.log("✅ Contact message sent successfully");
            } else {
                const resendError = await resendResponse.text();
                console.error("❌ Failed to send contact message:", resendError);
            }
        } else {
            console.warn("⚠️ RESEND_API_KEY not configured, skipping email send");
        }

        res.json({
            success: true,
            message: "Thank you for your message! We'll get back to you soon.",
        });
    } catch (error: any) {
        console.error("❌ Contact API error:", error);
        res.status(500).json({
            error: "Failed to process contact form",
            message: error.message,
        });
    }
}