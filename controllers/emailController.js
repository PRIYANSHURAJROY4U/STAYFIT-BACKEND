const transporter = require("../config/nodemailerConfig");
const path = require("path");
const fs = require("fs");

const sendEmail = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email || !phone) {
      return res.status(400).json({ success: false, message: "Email and phone number are required" });
    }

    // Generate a 5-digit OTP
    const otp = Math.floor(10000 + Math.random() * 90000);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP verification Code from STAYFIT",
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "OTP sent successfully", otp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendEmail };
