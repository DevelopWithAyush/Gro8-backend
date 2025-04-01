import mongoose, { Schema, Types, model } from "mongoose";


const profileDetailsSchema = new Schema({
    mentorId: {
        type: Types.ObjectId,
        ref: "Mentor",
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
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],
    },
    industryPreference: {
        type: [String],
        required: true,
    },
    whatCountryyouFillingTaxReturnsIn: {
        type: String,
        required: true,
    },
   
    
}, {
    timestamps:true
})


const ProfileDetails = model("ProfileDetails", profileDetailsSchema);

export default ProfileDetails;