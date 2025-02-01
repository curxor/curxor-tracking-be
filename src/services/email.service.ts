import { sendEmailDto } from "../dtos/email.dto";
import nodemailer from "nodemailer";
export default class EmailService {
  static sendEmail(sendEmailDto: sendEmailDto) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    transporter.sendMail({ from: "", ...sendEmailDto }, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
