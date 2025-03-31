import mongoose, { Schema, model } from "mongoose";


const dealsCurationSchema = new Schema({
    HowIsYourTeamTheBestToSolveTheProblemThatYoureTryingToTackle: {
        type: String,
        required: true,
    },
    WhatIsYourVisionInTermsOfScalingYourStartup: {
        type: String,
        required: true,
    },
    WhatIsTheGoToMarketStrategyBeingAdoptedByTheStartup: {
        type: String,
        required: true,
    },
    WhenDoYouPlanToCloseThisRound: {
        type: Date,
    },
    PleaseShareTheInvestmentTermsForThisRoundInDetail: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})
const DealsCuration = model("DealsCuration", dealsCurationSchema);

export default DealsCuration;
