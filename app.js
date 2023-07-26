const express = require("express");
const path = require("path");

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

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
  // Serve the ordernow.html file for the "Order Now" page
  res.sendFile(path.join(__dirname, "ordernow.html"));
});

module.exports = app;
