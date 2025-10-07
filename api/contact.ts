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
            console.error("❌ Missing Mailchimp credentials", { 
                hasApiKey: !!apiKey, 
                hasAudienceId: !!audienceId 
            });
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
                const updateUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${encodeURIComponent(email)}`;
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

        // Add the contact details to merge fields for easy viewing in Mailchimp
        // You can see all contact form submissions in your Mailchimp audience with the "contact" tag
        // The merge fields will include SUBJECT and MESSAGE for easy review
        
        try {
            // Update the subscriber with additional merge fields including the message
            const updateUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${encodeURIComponent(email)}`;
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
                        SUBJECT: subject,
                        MESSAGE: message.substring(0, 500), // Mailchimp has limits on merge field length
                    },
                    tags: ["contact", "needs-response"],
                }),
            });

            if (updateResponse.ok) {
                console.log("✅ Contact form data saved to Mailchimp with 'needs-response' tag");
                console.log(`📋 Contact Details: ${name} (${email}) - Subject: ${subject}`);
                console.log(`💬 Message: ${message}`);
                console.log("👀 Check your Mailchimp audience for contacts tagged 'needs-response'");
            } else {
                const errorResponse = await updateResponse.json();
                console.error("❌ Failed to update contact in Mailchimp:", errorResponse);
            }
        } catch (updateError) {
            console.error("❌ Error updating contact in Mailchimp:", updateError);
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