import mongoose,{Schema,Types,model} from "mongoose";


const founderSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    website: {
        type: String,
        unique: true,
    },
    industryPreference: {
        type: [String],
    },
    linkedin: {
        type: Types.ObjectId,
        ref: "Linkedin",
    },
})


const Founder = model("Founder", founderSchema);

export default Founder;