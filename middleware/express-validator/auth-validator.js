import { body } from "express-validator";



export const sendOtpValidator = () => {
    return [
        body("email").isEmail().withMessage("Invalid email"),
        body("phoneNumber").isMobilePhone().withMessage("Invalid phone number"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    ]
} 


export const verifyOtpValidator = () => {
    return [
        body("email").isEmail().withMessage("Invalid email"),
        body("otp").isLength({ min: 6 }).withMessage("OTP must be 6 digits long"),
    ]
}

export const loginValidator = () => {
    return [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    ]
}

export const roleValidator = () => {
    return [
        body("role").notEmpty().withMessage("Please select a role").isIn(["MENTOR", "FOUNDER", "INVESTOR"]).withMessage("Invalid role"),
    ]
}