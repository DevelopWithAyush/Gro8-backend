import mongoose, { Schema, Types, model } from "mongoose";


const investorProfileDetailsSchema = new Schema({
    investorId: {
        type: Types.ObjectId,
        ref: "Investor",
        required: true,
    },
    linkedin: {
        type: Types.ObjectId,
        ref: "Linkedin",
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    industryPreference:{
        type: [String],
        required: true,
        
    },
    taxCountry:{
        type: [String],
        required: true,
    },
   
}, {
    timestamps: true,
});

const InvestorProfileDetails = model("InvestorProfileDetails", investorProfileDetailsSchema);

export default InvestorProfileDetails;

