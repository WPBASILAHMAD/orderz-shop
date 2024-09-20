/** @format */
const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  // Determine the template based on the templateType option
  const isVendor = options.templateType === "vendor";

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: `
      <div style="width: 100%; font-family: Arial, sans-serif; color: #333; background-color: #f7f9fc; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 12px rgba(0,0,0,0.1);">
          
          <!-- Header with Logo and ${
            isVendor ? "Blue" : "Mustard Yellow"
          } Background -->
          <div style="background-color: ${
            isVendor ? "#003366" : "#ffcc00"
          }; padding: 20px; text-align: center;">
            <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1726790400&semt=ais_hybrid" alt="Your Logo" style="max-width: 120px; border-radius: 50%;" />
          </div>
          
          <!-- Body Content -->
          <div style="padding: 30px;">
            <h1 style="font-size: 28px; color: ${
              isVendor ? "#003366" : "#ffcc00"
            }; text-align: center; margin-bottom: 20px;">
              Welcome, ${options.name}!
            </h1>
            <p style="font-size: 16px; color: #555555; line-height: 1.7; margin-bottom: 25px;">
              Thank you for becoming a vendor at <strong>OrderzShop</strong>! We’re excited to have you on board.
            </p>

            <!-- Custom Message -->
            <p style="font-size: 16px; color: #333; line-height: 1.7; margin-bottom: 25px;">
              Shop Name: <strong>${options.name}</strong><br/><br/>
              <!-- EasyPaisa Account Info --> 
              ${options.customMessage}
            </p>

            <!-- WhatsApp Instructions -->
            <p style="font-size: 16px; color: #333; line-height: 1.7; margin-bottom: 25px;">
              After making the payment, please send a screenshot along with your Shop ID to our WhatsApp number: 
              <strong>${
                options.whatsappNumber
              }</strong>. We will review and activate your account.
            </p>
            
            <!-- Button with Mustard Yellow Color -->
            <div style="text-align: center;">
              <a href="${
                options.activationUrl
              }" style="display: inline-block; background-color: #ffcc00; color: #003366; padding: 12px 25px; border-radius: 30px; text-decoration: none; font-size: 16px; font-weight: bold; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">Activate Vendor Account</a>
            </div>
            
            <p style="font-size: 14px; color: #777777; margin-top: 30px; text-align: center;">
              If you did not sign up for this account, you can safely ignore this email.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #003366; padding: 15px; text-align: center; color: white; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} OrderzShop. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
