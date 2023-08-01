const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer"); // Import Nodemailer

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add support for parsing JSON

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "homepage.html"));
});

app.get("/paddles", (req, res) => {
  // Handle paddles route
  res.send("Paddles page");
});

app.get("/photography", (req, res) => {
  // Handle photography route
  res.send("Photography page");
});

app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "ordernow.html"));
});

// Handle the form submission
app.post("/submitOrder", (req, res) => {
  const formData = req.body;

  // Validate the form data
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.paddleDesign || !formData.paddleSize || !formData.organization) {
    return res.status(400).json({ message: "Please fill in all required fields." }); // Return a 400 status if any field is missing
  }

  // Send the email
  sendEmailToAshleen(formData)
    .then(() => {
      // Respond with a success message
      res.status(200).json({ message: "Order submitted successfully." });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email. Please try again later." }); // Return a 500 status if there was an error sending the email
    });
});

async function sendEmailToAshleen(formData) {
    // Create a Nodemailer transporter using your email provider settings
    let transporter = nodemailer.createTransport({
      // Replace these options with your email provider settings
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "sabamoa.photography@gmail.com",
        pass: "DST1913REDZ222!",
      },
    });
  
    // Compose the email
    let emailText = `
      Hello Sabamoa Photography,
  
      You have received a new order:
  
      First Name: ${formData.firstName}
      Last Name: ${formData.lastName}
      Email: ${formData.email}
      Paddle Size: ${formData.paddleSize}
      Paddle Base Color: ${formData.paddleBaseColor}
      Organization: ${formData.organization}
      Paddle Design: ${formData.paddleDesign}
  
      Thank you for your attention.
  
      Best regards,
      Sabamoa Order Bot
    `;
  
    let mailOptions = {
      from: "sabamoa.photography@gmail.com", // Replace with your email address
      to: "sabamoa.photography@gmail.com", // Replace with the recipient's email address
      subject: "New Order", // Subject of the email
      text: emailText, // Plain text body of the email
    };
  
    // Send the email
    await transporter.sendMail(mailOptions);
  }
  

module.exports = app;
