import Mentor from "../../model/mentor/mentor.js";
import { TryCatch } from "../../utility/utility.js";

export const handleGetMentorDetails = TryCatch(async (req, res, next) => {
    const mentor = await Mentor.findOne({ userId: req.user._id }).populate("profileDetails").populate("expertise").populate("userId").populate("mentorshipPreferences");
    if (!mentor) {
        return next(new ErrorHandler("Mentor not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Mentor fetched successfully",
        mentor  
    });
})