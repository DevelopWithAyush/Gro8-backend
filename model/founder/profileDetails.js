import mongoose,{Schema,Types,model} from "mongoose";


const profileDetailsSchema = new Schema({
    linkedin: {
        type: Types.ObjectId,
        ref: "Linkedin",
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    industryPreference: {
        type: [String],
        required: true,
    },
    
},
    {
        timestamps: true,
    }
)

const ProfileDetails = model("ProfileDetails", profileDetailsSchema);

export default ProfileDetails;