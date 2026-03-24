import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const sesClient = new SESClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

interface SendEmailOptions {
  to: string
  templateName: string
  templatePrice: number
  downloadUrl: string
  orderId: string
}

export async function sendOrderConfirmationEmail(options: SendEmailOptions) {
  const { to, templateName, templatePrice, downloadUrl, orderId } = options

  const emailHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { padding: 20px; background: #f9f9f9; margin-top: 20px; border-radius: 8px; }
          .download-btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; font-weight: bold; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Your Template is Ready!</h1>
          </div>
          
          <div class="content">
            <h2>Thank you for your purchase!</h2>
            
            <p>You've successfully purchased <strong>${templateName}</strong> from Code Craft AI.</p>
            
            <h3>Order Details:</h3>
            <ul>
              <li><strong>Order ID:</strong> ${orderId}</li>
              <li><strong>Template:</strong> ${templateName}</li>
              <li><strong>Price:</strong> $${templatePrice}</li>
              <li><strong>Download Link Expires:</strong> 24 hours</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="${downloadUrl}" class="download-btn">📥 Download Your Template</a>
            </p>
            
            <p><strong>What's included:</strong></p>
            <ul>
              <li>Complete source code</li>
              <li>Full documentation</li>
              <li>Ready to deploy</li>
              <li>Fully customizable</li>
            </ul>
            
            <p style="background: #fff3cd; padding: 10px; border-radius: 4px; color: #856404;">
              <strong>⚠️ Important:</strong> Your download link expires in 24 hours. Download now if you haven't already.
            </p>
          </div>
          
          <div class="footer">
            <p>Need help? Contact us at support@code-craft-ai.com</p>
            <p>&copy; 2026 Code Craft AI. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  const emailText = `
Your Template is Ready!

Thank you for purchasing ${templateName} from Code Craft AI.

Order ID: ${orderId}
Template: ${templateName}
Price: $${templatePrice}
Download Link Expires: 24 hours

Download: ${downloadUrl}

Important: Your download link expires in 24 hours. Download now if you haven't already.

--
Code Craft AI
support@code-craft-ai.com
  `.trim()

  try {
    const command = new SendEmailCommand({
      Source: 'noreply@code-craft-ai.com',
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: `Your ${templateName} is Ready! 🎉`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: emailHtml,
            Charset: 'UTF-8',
          },
          Text: {
            Data: emailText,
            Charset: 'UTF-8',
          },
        },
      },
    })

    const response = await sesClient.send(command)
    console.log(`✅ Email sent to ${to} (MessageId: ${response.MessageId})`)
    return { success: true, messageId: response.MessageId }
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error)
    // Don't throw - order is already created, just log email failure
    return { success: false, error: String(error) }
  }
}
