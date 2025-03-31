import mongoose, { Schema, Types, model } from "mongoose";


const businessDetailsSchema = new Schema({
    gstNumber: {
        type: String,
        required: true,
    },
    SEBI_Draft_offer_document_number: {
        type: String,
        required: true,
    },
    productServiceDescription: {
        type: String,
        required: true,
    },
    elevatorPitch: {
        type: String,
        required: true,
    },
    productServiceVideoShowcase: {

    },
    productServiceImages: {
        // this can be multiple image 
    },
    businessModelDescription: {
        type: String,
        required: true,
    },
    problemSolvedByProductService: {
        type: String,
        required: true,
    },
    competitorsOfStartup: {
        type: String,
        required: true,
    },
    whatMakesProductServiceStandOut: {
        type: String,
        required: true,
    },
    alreadyExistingOutsideFunding: {
        type: Boolean,
        required: true,
    },
    targetCustomersBasedIn: [
        {
            country: {
                type: String,
                required: true,
            },
        },
    ],
    typesOfSales: [
        {
            type: String,
            required: true,
        },
    ],
    whichCategoryMatchesTheBusinessModelOfYourCompany: {
        type: String,
        required: true,
    },
    describeTheMaturityOfYourBusinessModel: {
        type: String,
        required: true,
    },
    whoAreYourKeyClients: {
        type: String,
        required: true,
    },
    existingInvestors: [
        {
            teamMemberName: {
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
            InvestedAmount: {
                type: Number,
            },  
        },
    ],
  
  
})


const BusinessDetails = model("BusinessDetails", businessDetailsSchema);

export default BusinessDetails;