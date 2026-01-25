const ContactMessage = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.submitContact = async (req, res) => {
  try {
    // Support two payload styles:
    // 1) Full form: { firstName, lastName, email, phone, service, message }
    // 2) Short form: { name, email, message }
    let { firstName, lastName, email, phone, service, message, name } = req.body;

    if (!email || !(message || req.body.message)) {
      return res.status(400).json({ message: 'Email and message are required' });
    }

    if (!firstName && name) {
      const parts = String(name).trim().split(/\s+/);
      firstName = parts.shift() || '';
      lastName = parts.join(' ') || '';
    }

    // Provide sensible defaults for missing optional fields
    phone = phone || '';
    service = service || 'General';
    message = message || req.body.message;

    // Save to DB
    const contact = new ContactMessage({ firstName, lastName, email, phone, service, message });
    await contact.save();

    // Send email to admin if SendGrid API key or SMTP credentials are configured
    if (process.env.SENDGRID_API_KEY) {
      try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: process.env.ADMIN_EMAIL,
          from: process.env.ADMIN_EMAIL,
          subject: 'New Contact Message from Portfolio',
          html: `
            <h3>New Contact Message</h3>
            <p><b>Name:</b> ${firstName || ''} ${lastName || ''}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Service:</b> ${service}</p>
            <p><b>Message:</b><br/>${message}</p>
          `,
        };
        await sgMail.send(msg);
      } catch (sgErr) {
        console.warn('Contact saved but failed to send SendGrid email:', sgErr.message || sgErr);
      }
    } else if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.ADMIN_EMAIL,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Contact Message from Portfolio',
          html: `
            <h3>New Contact Message</h3>
            <p><b>Name:</b> ${firstName || ''} ${lastName || ''}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Service:</b> ${service}</p>
            <p><b>Message:</b><br/>${message}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (mailErr) {
        console.warn('Contact saved but failed to send notification email:', mailErr.message || mailErr);
      }
    }

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in contact submission:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};