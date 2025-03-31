import { model, Schema } from "mongoose";



const grantsFundingSchema = new Schema({
    HasYourStartupReceievedAnyGrantsOrFunding: {
        type: String,
        required: true,
        enum: ["Grant", "Funding","none"],
    },
    schemeName: {
        type: String,
    },
    GrantReceivedAmount: {
        type: Number,
    },
    date: {
        type: Date,
    }
}, {
    timestamps: true,
})


const GrantsFunding = model("GrantsFunding", grantsFundingSchema);

export default GrantsFunding;