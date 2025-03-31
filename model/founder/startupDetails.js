import mongoose,{Schema,Types,model} from "mongoose";

const startupDetailsSchema = new Schema({
    startupName: {
        type: String,
        required: true,
    },
    registeredNameOfStartup: {
        type: String,
        required: true,
    },
    monthAndYearOfIncorporation: {
        type: String,
        required: true,
    },
    aboutStartup: {
        type: String,
        required: true,
    },
    startupSector: {
        type: String,
        required: true,
    },
    companyType: {
        type: String,
        required: true,
    },
    startupAddress: {
        type: String,
        required: true,
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
    startupStage: {
        type: String,
        required: true,
    },
    numberOfEmployees: {
        type: Number,
        required: true,
    },
 
}, {
    timestamps: true,
})

const StartupDetails = model("StartupDetails", startupDetailsSchema);

export default StartupDetails;