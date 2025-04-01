import mongoose, { Schema, Types, model } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false,
    },
    token: {
        type: String,
        select: false,
    },
    role: {
        type: [String],
        enum: ["MENTOR", "FOUNDER","INVESTOR"],
    },
    otp: {
        type: String,
        select: false,
    },
    otpExpiry: {
        type: Date,
        select: false,
    },
    isPhoneNumberVerified: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

const User = model("User", userSchema);

export default User;
