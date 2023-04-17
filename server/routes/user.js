const express = require("express");
const nodemailer = require("nodemailer");
const cheerio = require("cheerio");
const router = express.Router();
require("dotenv").config();



router.post("/", async (req, res) => {
  // console.log(req.body);
  
  if(req.body.email !== ""){
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "useremail@gmail.com", // Your email address
      pass: process.env.Password, // Password (for gmail, your app password)
    },
  });

  let info = await transporter.sendMail({
    from: "useremail@gmail.com",
    to: req.body.email,
    subject: req.body.emailSubject || "THIS IS A DUMMY EMAIL",
    html: req.body.htmlPage,
    text: "This Email is sent by node mailer.",
  });
  console.log(info.messageId);
}
});

module.exports = router;