const nodemailer = require("nodemailer");

// Function to send the email using Nodemailer
async function sendEmailToAshleen(firstName, lastName, email, organization, size, paddleDesign) {
  try {
    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: "your_smtp_host", // Replace with your SMTP host
      port: 587, // Replace with your SMTP port
      secure: false, // Replace with true if your SMTP server requires a secure connection
      auth: {
        user: "sabamoa.photography@gmail.com", // Replace with your email address
        pass: "DST1913REDZ222!", // Replace with your email password
      },
    });

    // Setup email data
    const mailOptions = {
      from: "sabamoa.photography@gmail.com", // Replace with your email address
      to: "ashleen.moallem@gmail.com", // The recipient's email address
      subject: "New Order Submitted", // Subject line of the email
      text: `
        New order details:
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Organization: ${organization}
        Size: ${size}
        Paddle Design: ${paddleDesign}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // If there's an error, throw it to be caught in the app.js route handler
    throw error;
  }
}

module.exports = sendEmailToAshleen;
