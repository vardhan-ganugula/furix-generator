import nodemailer from 'nodemailer';
import { verificationEmailTemplate } from '@/constants/emailTemplates';
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
// Create a transporter object using the SES transport
if(!host || !port || !user || !pass){
    throw new Error("Please provide all the mail details");
}
const transporter = nodemailer.createTransport(
    {
        host,
        port: parseInt(port),
        secure: true, 
        auth: {
            user,
            pass
        },
    }
);

// Setup email data
type mailType = 'verify' | 'reset';

interface mailOptionsType{
    from: string,
    to: string,
    subject: string,
    html: string
}


const sendEmail = async (email: string, token: string, type: mailType) => {
    let mailOptions: mailOptionsType;
    if(type === 'verify'){
        mailOptions = {
            from: `"Metron.Tech" <${user}>`,
            to: email,
            subject: 'Account Verification',
            html: verificationEmailTemplate(token)
        }
    }
    else{
        mailOptions = {
            from: `"Metron.Tech" <${user}>`,
            to: email,
            subject: 'Reset Password',
            html: `<p>Click on the link below to reset your password</p>
            <a href="${process.env.BASE_URL}/reset-password?token=${token}">Reset Password</a>`
        }
    }
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error(error);
        }
        console.log('Message sent');
    });
}


export default sendEmail;