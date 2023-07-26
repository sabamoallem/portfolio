const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer"); // Import Nodemailer

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

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
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.paddleDesign || !formData.size || !formData.organization) {
    return res.status(400).send("Please fill in all required fields."); // Return a 400 status if any field is missing
  }

  // Send the email
  sendEmailToAshleen(formData)
    .then(() => {
      // Redirect the user back to the homepage or show a success message
      res.redirect("/");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email. Please try again later."); // Return a 500 status if there was an error sending the email
    });
});

// Function to send email using Nodemailer
async function sendEmailToAshleen(formData) {
  // Create a Nodemailer transporter using your email provider settings
  let transporter = nodemailer.createTransport({
    // Replace these options with your email provider settings
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "your_email@example.com",
      pass: "your_email_password",
    },
  });

  // Compose the email
  let emailText = `
    First Name: ${formData.firstName}
    Last Name: ${formData.lastName}
    Email: ${formData.email}
    Paddle Design: ${formData.paddleDesign}
    Size: ${formData.size}
    Organization: ${formData.organization}
  `;

  let mailOptions = {
    from: "moallema@oregonstate.edu", // Replace with your email address
    to: "ashleen.moallem@gmail.com", // Replace with Ashleen's email address
    subject: "New Order", // Subject of the email
    text: emailText, // Plain text body of the email
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = app;
