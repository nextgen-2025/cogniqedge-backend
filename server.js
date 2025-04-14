const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,  // Use your email for authentication
    pass: process.env.PASSWORD,
  },
});

app.post("/send-email", async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,  // Shows user's name but uses your authenticated email
    replyTo: email,  // This ensures replies go to the user
    to: "saksamgupta4@gmail.com", // Your business email where you receive messages
    subject: "New Submission Form",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nDesignation: ${subject}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
