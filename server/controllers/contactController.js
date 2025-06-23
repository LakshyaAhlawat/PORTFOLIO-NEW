const ContactMessage = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.submitContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !service || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to DB
    const contact = new ContactMessage({ firstName, lastName, email, phone, service, message });
    await contact.save();

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD, // Add this to your .env
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Message from Portfolio',
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error in contact submission:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};