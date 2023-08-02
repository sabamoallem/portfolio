const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");
const FormData = require("form-data");

const app = express();
const DOMAIN = "https://app.mailgun.com/app/sending/domains/sandboxd2ac3170934c49bab9e1eae8bcf8946e.mailgun.org"; 
const mg = mailgun({ apiKey: "4e034d9e-74ee62ee", domain: DOMAIN });

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "homepage.html"));
});

// Handle "/paddles" route
app.get("/paddles", (req, res) => {
  res.sendFile(path.join(__dirname, "paddles.html"));
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
    return res.status(400).send("Please fill in all required fields."); // Return a 400 status if any field is missing
  }

  // Send the email
  sendEmailToSabamoa(formData)
    .then(() => {
      // Redirect the user back to the homepage or show a success message
      res.redirect("/");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email. Please try again later."); // Return a 500 status if there was an error sending the email
    });
});

// Function to send email using Mailgun
function sendEmailToSabamoa(formData) {
  const data = new FormData();
  data.append("from", "Excited User <mailgun@sandboxd2ac3170934c49bab9e1eae8bcf8946e.mailgun.org>");
  data.append("to", "ashleen.moallem@gmail.com"); 
  data.append("subject", "New Order");
  data.append("text", `
    First Name: ${formData.firstName}
    Last Name: ${formData.lastName}
    Email: ${formData.email}
    Paddle Design: ${formData.paddleDesign}
    Size: ${formData.paddleSize}
    Organization: ${formData.organization}

    Note: This is your order. If it looks to your liking, please send it and wait 3-5 business days for a response.
  `);

  return new Promise((resolve, reject) => {
    mg.messages.create(DOMAIN, data, (error, body) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent successfully:", body);
        resolve(body);
      }
    });
  });
}

module.exports = app;
