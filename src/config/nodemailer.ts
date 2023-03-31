import nodemailer, { Transporter } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAILER as string, // generated ethereal user
    pass: process.env.PASS_EMAILER as string, // generated ethereal password
  },
});

transporter.verify().then(() => {
}).catch(err => console.log(err));

export default transporter;
