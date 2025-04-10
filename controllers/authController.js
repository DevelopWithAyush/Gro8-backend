import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User from "../model/user.js";
import { sendOtp } from "../services/authServices.js";
import { cookieOption, sendToken, setRoleIfOne } from "../utility/features.js";
import { ErrorHandler, TryCatch } from "../utility/utility.js";
import jwt from 'jsonwebtoken';

export const handleSendOtp = TryCatch(async (req, res, next) => {
    const { email, phoneNumber, password } = req.body;
    console.log("ayush")

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new ErrorHandler(error.array()[0].msg, 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, phoneNumber, password: hashedPassword });
    try {
        await sendOtp(email);
        res.status(200).json({
            success: true,
            message: "OTP sent to email",
        })
    } catch (error) {
        return next(new ErrorHandler("Failed to send OTP", 500));
    }
})

export const handleLogin = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new ErrorHandler(error.array()[0].msg, 400));
    }

    const user = await User.findOne({ email }, { password: 1, token: 1, otp: 1, otpExpiry: 1 });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new ErrorHandler("Invalid password", 400));
    }

    try {
        await sendOtp(email);
        res.status(200).json({
            success: true,
            message: "OTP sent to email",
        })
    } catch (error) {
        return next(new ErrorHandler("Failed to send OTP", 500));
    }
})

export const handleVerifyOtp = TryCatch(async (req, res, next) => {
    const { email, otp } = req.body;

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: error.array()[0].msg
        })
    }
    const user = await User.findOne({ email }, { password: 1, token: 1, otp: 1, otpExpiry: 1 });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }
    if (user.otp !== otp) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        })
    }
    if (user.otpExpiry < new Date()) {
        return res.status(400).json({
            success: false,
            message: "OTP expired"
        })
    }

    user.isEmailVerified = true;
    await user.save();

    sendToken(res, user, 200, "Email verified successfully")
})

export const handleLogout = TryCatch(async (req, res, next) => {
    res.clearCookie("authToken");
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})

export const handleGetMe = TryCatch(async (req, res, next) => {

    const user = await User.findById(req.user._id).populate("linkedin");



    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if (user.role.length === 1) {
        return setRoleIfOne(res, user)
    }

    res.status(200).json({
        success: true,
        user: user
    })
})

export const handleSelectNewRole = TryCatch(async (req, res, next) => {
    const { role } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new ErrorHandler(error.array()[0].msg, 400));
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    if (user.role.includes(role)) {
        return next(new ErrorHandler("Role already selected", 400));
    }

    await User.findByIdAndUpdate(req.user._id, { role: [...req.user.role, role] });

    res.status(200).json({
        success: true,
        message: "Role selected successfully"
    })
})

export const handleSelectRole = TryCatch(async (req, res, next) => {
    const { role } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new ErrorHandler(error.array()[0].msg, 400));
    }
    const user = await User.findById(req.user._id)
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    if (!user.role.includes(role)) {

        return next(new ErrorHandler("Role not found", 404));
    }

    res.status(200).cookie("role", role, cookieOption).json({
        success: true,
        message: "Role selected successfully"
    })
})

// Register a new user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Add your registration logic here
        // Example: Check if user exists, hash password, save user to database

        return res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Add your login logic here
        // Example: Verify credentials, generate JWT token

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            // token: generatedToken
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Verify user authentication middleware
export const authenticate = async (req, res, next) => {
    try {
        // JWT verification logic
        // Set req.user if authenticated
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};