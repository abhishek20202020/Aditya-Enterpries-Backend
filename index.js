const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Important for preflight
// app.options("/*", cors());



// Transporter setup (Common for all routes)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= CONTACT ==================
app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    await transporter.sendMail({
      from: `"Aditya Enterprises Contact" <${process.env.EMAIL_USER}>`,
      to: "ismartabhishek145@gmail.com",
      subject: "New Aditya Enterprises Contact Form Message From Stado Website",
      html: `<h2>Product Inquiry</h2>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Message:</b> ${message}</p>`,
    });
    res.json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
  console.error("MAIL ERROR:", err); // 👈 ADD THIS
  res.status(500).json({ success: false, msg: "Mail Failed" });
}
});
// ================= SERVER START from here==================
app.listen(PORT, () => {
  console.log(`AdityaEnterprises Backend running on port ${PORT}`);
});