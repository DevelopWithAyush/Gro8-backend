import mongoose, { Schema, model } from "mongoose";

const acceleratorDetailsSchema = new Schema({
    AcceleratorName: {
        type: String,
        required: true,
    },
    
})

