const nodeMailer = require("nodemailer");
const config = require("../config/config");

const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: config.smtpHost,
      port: 587,
      secure: false,
      auth: {
        user: config.smtpUsername,
        pass: config.smtpPassword,
      },
    });

    const mailOptions = {
      from: "kisanchoudhary000@gmail.com",
      to: email,
      subject: subject,
      html: message,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (err) {
    console.log(`Error sending email to ${email}:`, err);
    throw new Error("Error sending email");
  }
};

module.exports = sendEmail;
