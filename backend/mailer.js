const nodemailer = require('nodemailer');

async function sendLoginCode(email, code) {
  // Configurare transport Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // ex: david777nyikora@gmail.com
      pass: process.env.GMAIL_PASS  // parola sau app password
    }
  });

  const mailOptions = {
    from: 'FootballVoice <' + process.env.GMAIL_USER + '>',
    to: email,
    subject: 'Cod de autentificare FootballVoice',
    text: `Codul tău de autentificare este: ${code}`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendLoginCode };
