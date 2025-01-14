import nodemailer from "nodemailer";
import { passwordResetEmailTemplate, verificationEmailTemplate } from "@/constants/emailTemplates";

const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT as string;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

// checking if all the required environment variables are provided
function checkEnvVariables() {
  if (!host || !port || !user || !pass) {
    console.log("Mail credentials not provided");
    console.log(!host, !port, !user, !pass);
    return false;
  }
  return true;
}

// Setup email types
type mailType = "verify" | "reset";

interface mailOptionsType {
  from: string;
  to: string;
  subject: string;
  html: string;
}

// Send email function
const sendEmail = async (email: string, token: string, type: mailType) => {
  let mailOptions: mailOptionsType;
  if (!checkEnvVariables()) {
    console.log('Mail credentials not provided');
    console.table([host, port, user, pass]);
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port) || 465,
    secure: port === "465", // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.error("Error with transporter configuration:", error);
    } else {
      console.log(success)
      console.log("Server is ready to take our messages");
    }
  });

  if (type === "verify") {
    mailOptions = {
      from: `"Metron.Tech" <${user}>`,
      to: email,
      subject: "Account Verification",
      html: verificationEmailTemplate(token),
    };
  } else {
    mailOptions = {
      from: `"Metron.Tech" <${user}>`,
      to: email,
      subject: "Reset Password",
      html: passwordResetEmailTemplate(token),
    };
  }

  // Send mail with defined transport object
  try {
    const res = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", res);
    return res;
  } catch (error) {
    console.error("Error sending email:", error);
    return (error as Error).message
  }
};

export default sendEmail;
