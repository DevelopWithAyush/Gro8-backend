import User from "../model/user.js";
import nodemailer from "nodemailer";
export const sendOtp = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    const otpData = await User.findOneAndUpdate({ email }, { otp, otpExpiry });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP for GRO8",
        text: `Your OTP is ${otp} and it will expire in 10 minutes`
    }

    await transporter.sendMail(mailOptions);

    return otpData;
} 