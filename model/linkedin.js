import mongoose,{Schema,Types,model} from "mongoose";


const linkedinSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    
})


