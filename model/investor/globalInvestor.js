import mongoose, { Schema, Types, model } from "mongoose";


const globalInvestorSchema = new Schema({
    investorId: {
        type: Types.ObjectId,
        ref: "Investor",
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    uploadIDDocument: {
        type: String,
        required: true,
    },
    chooseTypeOfVerification: {
        type: String,
        enum: ["Tax Form review", "Verification by a licensed professional", "Third-party review"],
    }
  
    
});