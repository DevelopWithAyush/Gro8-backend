import mongoose, { Schema, model } from "mongoose";


const businessKpiSchema = new Schema({
    businessUpdates: {
        type: String,
        required: true,
    },
    UploadRevenueFile: {
        type: String,
        required: true,
    },
    UploadKpiIndicator: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})


const BusinessKpi = model("BusinessKpi", businessKpiSchema);

export default BusinessKpi;
