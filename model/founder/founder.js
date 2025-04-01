import mongoose, { Schema, Types, model } from "mongoose";


const founderSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    profileDetails: {
        type: Types.ObjectId,
        ref: "ProfileDetails",
    },
    startupDetails: {
        type: Types.ObjectId,
        ref: "StartupDetails",
    },
    businessDetails: {
        type: Types.ObjectId,
        ref: "BusinessDetails",
    },
    teamDetails: {
        type: Types.ObjectId,
        ref: "TeamDetails",
    },
    businessKpi: {
        type: Types.ObjectId,
        ref: "BusinessKpi",
    },
    dealsCuration: {
        type: Types.ObjectId,
        ref: "DealsCuration",
    },
    grantsFunding: {
        type: Types.ObjectId,
        ref: "GrantsFunding",
    },
    acceleratorDetails: {
        type: Types.ObjectId,
        ref: "AcceleratorDetails",
    }
}, {
    timestamps: true
})


const Founder = model("Founder", founderSchema);

export default Founder;