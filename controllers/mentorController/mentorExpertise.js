import Expertise from "../../model/mentor/expertise.js";
import Mentor from "../../model/mentor/mentor.js";
import ProfileDetails from "../../model/mentor/profileDetails.js";
import { TryCatch } from "../../utility/utility.js";

export const handleCreateMentorExpertise = TryCatch(async (req, res, next) => {
    const { expertise } = req.body;

    const existingMentor = await Mentor.findOne({ userId: req.user._id });

    if (!existingMentor) {
        return res.status(200).json({
            success: true,
            message: "Mentor not found, please complete the necessary details",
            redirect: "/mentor/onboard/profile"
        });
    }

    const existingProfile = await ProfileDetails.findOne({ mentorId: existingMentor._id });

    if (!existingProfile) {
        return res.status(200).json({
            success: true,
            message: "Profile details not found",
            redirect: "/mentor/onboard/profile"
        });
    }

    const existingExpertise = await Expertise.findOne({ mentorId: existingMentor._id });
    if (existingExpertise) {
        existingExpertise.expertise = expertise;
        await existingExpertise.save();
        
        return res.status(200).json({
            success: true,
            message: "Expertise updated successfully",
            expertise: existingExpertise
        });
    }

    const newExpertise = await Expertise.create({ mentorId: existingMentor._id, expertise });
    existingMentor.expertise = newExpertise._id;
    await existingMentor.save();    
    return res.status(200).json({
        success: true,
        message: "Expertise created successfully",
        expertise: newExpertise
    });
});



export const handleGetMentorExpertise = TryCatch(async (req, res, next) => {
    const mentor = await Mentor.findOne({ userId: req.user._id }).populate("expertise");

    if (!mentor) {
        return res.status(200).json({
            success: true,
            message: "Mentor not found",
            redirect: "/mentor/onboard/profile"
        });
    }

    const existingExpertise = await Expertise.findOne({ mentorId: mentor._id });
    if (!existingExpertise) {
        return res.status(200).json({
            success: true,
            message: "Expertise not found",
            redirect: "/mentor/onboard/expertise"
        });
    }

    res.status(200).json({
        success: true,
        message: "Expertise fetched successfully",
        expertise: existingExpertise
    });
});