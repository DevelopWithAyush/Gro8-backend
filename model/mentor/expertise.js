import mongoose, { Schema, Types, model } from "mongoose";

const expertiseSchema = new Schema({
    mentorId: {
        type: Types.ObjectId,
        ref: "Mentor",
        required: true,
    },
    expertise: [{
        startUpName: {
            type: String,
            required: true,
        },
        startUpDescription: {
            type: String,
            required: true,
        },
        detailsOfMentorshipOffered: {
            type: String,
            required: false,
        }
    }]
})  

const Expertise = model("Expertise", expertiseSchema);

export default Expertise;

