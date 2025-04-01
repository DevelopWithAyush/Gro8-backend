import mongoose, { Schema, Types, model } from "mongoose";

const mentorSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  profileDetails: {
    type: Types.ObjectId,
    ref: "ProfileDetails",
  },
  expertise: {
    type: Types.ObjectId,
    ref: "Expertise",
  },
  mentorshipPreferences: {
    type: Types.ObjectId,
    ref: "MentorshipPreferences",
  },
  isVerified: {
    type: String,
    enum: ["Pending", "Verified", "Rejected", "Deleted"],
    default: "Pending",
  },

}, {
  timestamps: true
})

const Mentor = model("Mentor", mentorSchema);

export default Mentor;