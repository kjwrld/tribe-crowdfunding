require('dotenv').config();

async function testMailchimp() {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    
    if (!apiKey || !audienceId) {
        console.error("❌ Missing MailChimp credentials");
        console.log("MAILCHIMP_API_KEY:", apiKey ? "Set" : "Missing");
        console.log("MAILCHIMP_AUDIENCE_ID:", audienceId ? "Set" : "Missing");
        return;
    }

    const datacenter = apiKey.split("-")[1];
    console.log("🔧 Datacenter:", datacenter);

    // Test data with KJ's email
    const testData = {
        email: "kjwilsondev@gmail.com",
        firstName: "KJ",
        lastName: "Wilson",
        amount: "25.00",
        phone: "+1234567890"
    };

    try {
        // Add to audience
        const mailchimpUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
        console.log("📧 Testing MailChimp URL:", mailchimpUrl);

        const subscriberData = {
            email_address: testData.email,
            status: "subscribed",
            merge_fields: {
                FNAME: testData.firstName,
                LNAME: testData.lastName,
                AMOUNT: testData.amount,
                PHONE: testData.phone,
            },
            tags: ["donor", "test"],
        };

        console.log("📤 Sending data:", JSON.stringify(subscriberData, null, 2));

        const response = await fetch(mailchimpUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subscriberData),
        });

        const result = await response.json();
        
        console.log("📨 Response status:", response.status);
        console.log("📨 Response:", JSON.stringify(result, null, 2));

        if (response.ok) {
            console.log("✅ Successfully added to MailChimp!");
        } else {
            console.log("❌ MailChimp error:", result);
        }

    } catch (error) {
        console.error("❌ Test failed:", error);
    }
}

testMailchimp();