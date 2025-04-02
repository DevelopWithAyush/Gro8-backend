import mongoose,{Schema,Types,model} from "mongoose";


const linkedinSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    linkedinId: {
        type: String,
        required: true,
        select: false,
    },
    location: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: "https://res.cloudinary.com/dpqsatnvt/image/upload/v1743593374/296fe121-5dfa-43f4-98b5-db50019738a7_ijm6ys.jpg",
    },
    linkedinUrl: {
        type: String,
    },
    accessToken: {
        type: String,
        select: false,
    }
})


const Linkedin = model("Linkedin", linkedinSchema);

export default Linkedin;

