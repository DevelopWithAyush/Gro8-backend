import { Schema, model } from "mongoose";


const investorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    investorType: {
        type: String,
        enum: ["International", "Indian", "NRI"],
        required: true
    },
    profileDetails: {
        type: Types.ObjectId,
        ref: "InvestorProfileDetails",
    },
    globalInvestor: {
        type: Types.ObjectId,
        ref: "GlobalInvestor",
    },
    isVerified: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    
    
   
})
