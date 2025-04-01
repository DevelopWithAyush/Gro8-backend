import mongoose, { Schema, Types, model } from "mongoose";


const mentorshipPreferencesSchema = new Schema({
    mentorId: {
        type: Types.ObjectId,
        ref: "Mentor",
        required: true,
    },

    howManyHoursCanYouDedicateToTheMentorshipProcessForAStartup: {
        type: Number,
        required: true,
        enum: ["16-47 Hours", "48 hours or more"]
    },

    areYouInterestedIn888vcAccelerator: {
        type: Boolean,
        required: false,
    },
    whatTypeOfMentorshipServicesDoYouOfferAsAMentor: {
        type: String,
        required: false,
    },
    iConfirmThatIAmReadyForAnyVerificationProcess: {
        type: Boolean,
        required: false,
    }

}, {
    timestamps: true
})


const MentorshipPreferences = model("MentorshipPreferences", mentorshipPreferencesSchema);

export default MentorshipPreferences;