import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      email, 
      firstName, 
      lastName, 
      amount, 
      phone,
      emailHTML 
    } = req.body;

    if (!email || !firstName || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, firstName, amount' 
      });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error('❌ Missing Mailchimp credentials');
      return res.status(500).json({ 
        error: 'Mailchimp not configured' 
      });
    }

    // Extract datacenter from API key (e.g., "us6" from key ending in "-us6")
    const datacenter = apiKey.split('-')[1];
    
    console.log('📧 Adding donor to Mailchimp:', { email, firstName, amount });

    // Add subscriber to Mailchimp audience
    const mailchimpUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
    
    const subscriberData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName || '',
        AMOUNT: amount.toString(),
        PHONE: phone || '',
      },
      tags: ['donor']
    };

    const mailchimpResponse = await fetch(mailchimpUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    });

    const mailchimpResult = await mailchimpResponse.json();

    if (!mailchimpResponse.ok) {
      // Check if user already exists (400 error with title "Member Exists")
      if (mailchimpResponse.status === 400 && mailchimpResult.title === 'Member Exists') {
        console.log('📧 Donor already in audience, updating tags...');
        
        // Update existing member with donor tag
        const updateUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${email}`;
        const updateResponse = await fetch(updateUrl, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName || '',
              AMOUNT: amount.toString(),
              PHONE: phone || '',
            },
            tags: ['donor']
          }),
        });

        if (updateResponse.ok) {
          console.log('✅ Updated existing donor in Mailchimp');
        }
      } else {
        console.error('❌ Mailchimp API error:', mailchimpResult);
        throw new Error(`Mailchimp error: ${mailchimpResult.detail || mailchimpResult.title}`);
      }
    } else {
      console.log('✅ Added new donor to Mailchimp audience');
    }

    // Send thank you email if HTML provided
    if (emailHTML) {
      console.log('📧 Sending thank you email...');
      
      const campaignData = {
        type: 'regular',
        recipients: {
          list_id: audienceId,
          segment_opts: {
            match: 'all',
            conditions: [{
              condition_type: 'EmailAddress',
              field: 'EMAIL',
              op: 'is',
              value: email
            }]
          }
        },
        settings: {
          subject_line: `Thank you for your $${amount} donation!`,
          title: `Thank You - ${firstName}`,
          from_name: 'YGBverse',
          reply_to: 'support@younggiftedbeautiful.org',
          auto_footer: false,
          inline_css: true,
        }
      };

      const campaignUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns`;
      const campaignResponse = await fetch(campaignUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      });

      if (campaignResponse.ok) {
        const campaign = await campaignResponse.json();
        
        // Set campaign content
        const contentUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns/${campaign.id}/content`;
        await fetch(contentUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            html: emailHTML
          }),
        });

        // Send campaign
        const sendUrl = `https://${datacenter}.api.mailchimp.com/3.0/campaigns/${campaign.id}/actions/send`;
        const sendResponse = await fetch(sendUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (sendResponse.ok) {
          console.log('✅ Thank you email sent successfully');
        } else {
          console.error('❌ Failed to send thank you email');
        }
      }
    }

    res.json({ 
      success: true, 
      message: 'Donor added to audience and thank you email sent!' 
    });

  } catch (error: any) {
    console.error('❌ Mailchimp donation API error:', error);
    res.status(500).json({ 
      error: 'Failed to process donation with Mailchimp',
      message: error.message 
    });
  }
}