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
    },
    token: {
        type: String,
    },
    role: {
        type: [String],
        enum: ["MENTOR", "FOUNDER","INVESTOR"],
    },
}, {
    timestamps: true,
})

const User = model("User", userSchema);

export default User;
