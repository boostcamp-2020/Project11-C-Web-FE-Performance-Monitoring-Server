import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import config from '../mailConfig';
import Mail = require('nodemailer/lib/mailer');

const { smtpServerURL, authUser, authPass, fromEmail, service, port } = config;

async function sendEmail(toEmail, title, html) {
  const transporter: Mail = nodemailer.createTransport({
    service,
    port: parseInt(port, 10),
    host: smtpServerURL, // SMTP 서버 주소
    auth: {
      user: authUser, // 메일서버 계정
      pass: authPass, // 메일서버 비번
    },
  });

  const mailOptions = {
    from: fromEmail, // 보내는 사람 주소
    to: toEmail, // 받는 사람 주소
    subject: title, // 제목
    html, // 본문
  };

  const res = await transporter.sendMail(mailOptions);
  return res;
}

export default { sendEmail };
