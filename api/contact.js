// No need to import types in JavaScript

module.exports = async function handler(req, res) {
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

        // Send confirmation email to the sender with their message copy
        try {
            console.log('📧 Sending confirmation email to sender...');
            
            const confirmationEmailHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Thank you for contacting YGBverse!</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #8614ff; border-bottom: 2px solid #8614ff; padding-bottom: 10px;">
                            Thank you for reaching out!
                        </h2>
                        
                        <p style="margin: 20px 0;">Hi ${name},</p>
                        
                        <p style="margin: 20px 0;">
                            Thank you for contacting YGBverse! We've received your message and will get back to you soon.
                        </p>
                        
                        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #8614ff; margin-top: 0;">Your Message:</h3>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #8614ff; margin-top: 10px;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        
                        <p style="margin: 20px 0;">
                            We typically respond within 24-48 hours. In the meantime, feel free to explore our 
                            <a href="https://younggiftedbeautiful.com" style="color: #8614ff;">website</a> 
                            to learn more about our mission.
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                        
                        <p style="color: #666; font-size: 12px; text-align: center;">
                            This is a confirmation of your message sent to YGBverse<br>
                            If you didn't send this message, please ignore this email.
                        </p>
                    </div>
                </body>
                </html>
            `;

            // Create a Mailchimp campaign to send confirmation to the sender
            const confirmationCampaignData = {
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
                    subject_line: `Thank you for contacting YGBverse - "${subject}"`,
                    title: `Confirmation - ${name}`,
                    from_name: "YGBverse",
                    reply_to: "info@younggiftedbeautiful.com",
                    auto_footer: false,
                    inline_css: true,
                },
            };

            const confirmationCampaignUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns`;
            const confirmationCampaignResponse = await fetch(confirmationCampaignUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(confirmationCampaignData),
            });

            if (confirmationCampaignResponse.ok) {
                const confirmationCampaign = await confirmationCampaignResponse.json();

                // Set campaign content
                const confirmationContentUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns/${confirmationCampaign.id}/content`;
                await fetch(confirmationContentUrl, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        html: confirmationEmailHtml,
                    }),
                });

                // Send campaign
                const confirmationSendUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns/${confirmationCampaign.id}/actions/send`;
                const confirmationSendResponse = await fetch(confirmationSendUrl, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                });

                if (confirmationSendResponse.ok) {
                    console.log("✅ Confirmation email sent to sender successfully");
                } else {
                    const errorResponse = await confirmationSendResponse.json();
                    console.error("❌ Failed to send confirmation email to sender:", errorResponse);
                }
            } else {
                const errorResponse = await confirmationCampaignResponse.json();
                console.error("❌ Failed to create confirmation campaign:", errorResponse);
            }
        } catch (confirmationError) {
            console.error("❌ Error sending confirmation email to sender:", confirmationError);
        }

        res.json({
            success: true,
            message: "Thank you for your message! We'll get back to you soon. Check your email for a confirmation.",
        });
    } catch (error) {
        console.error("❌ Contact API error:", error);
        res.status(500).json({
            error: "Failed to process contact form",
            message: error.message,
        });
    }
}