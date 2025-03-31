import mongoose, { Schema, model, Types } from "mongoose";

const teamDetailsSchema = new Schema({
    teamMembers: [
        {
            name: {
                type: String,
                required: true,
            },
            designation: {
                type: String,
                required: true,
            },
            linkdinUrl: {
                type: String,
            },
        },
    ],
    TellUsBitAboutHowTheFoundingTeamKnowsEachOther: {
        type: String,
        required: true,
    },
    WhyDidYouCreateThisStartup: {
        type: String,
        required: true,
    },
    AreTheFoundersWorkingOnThisProjectFullTime: {
        type: Boolean,
        required: true,
    },


}, {
    timestamps: true,
});


const TeamDetails = model("TeamDetails", teamDetailsSchema);

export default TeamDetails;
