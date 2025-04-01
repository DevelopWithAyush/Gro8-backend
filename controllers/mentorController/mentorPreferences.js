import Mentor from "../../model/mentor/mentor.js";
import ProfileDetails from "../../model/mentor/profileDetails.js";
import MentorshipPreferences from "../../model/mentor/mentorshipPreferences.js";
import { TryCatch } from "../../utility/utility.js";
import { validationResult } from "express-validator";
import Expertise from "../../model/mentor/expertise.js";

export const handleCreateMentorPreferences = TryCatch(async (req, res, next) => {
    const {
        howManyHoursCanYouDedicateToTheMentorshipProcessForAStartup,
        areYouInterestedIn888vcAccelerator,
        whatTypeOfMentorshipServicesDoYouOfferAsAMentor,
        iConfirmThatIAmReadyForAnyVerificationProcess,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array()[0].msg, 400));
    }

    const existingMentor = await Mentor.findOne({ userId: req.user._id });

    if (!existingMentor) {
        return res.status(200).json({
            success: true,
            message: "Mentor not found",
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

    if (!existingExpertise) {
        return res.status(200).json({
            success: true,
            message: "Expertise not found",
            redirect: "/mentor/onboard/expertise"
        });
    }

    const existingPreferences = await MentorshipPreferences.findOne({ mentorId: existingMentor._id });

    if (existingPreferences) {
        existingPreferences.howManyHoursCanYouDedicateToTheMentorshipProcessForAStartup = howManyHoursCanYouDedicateToTheMentorshipProcessForAStartup;
        existingPreferences.areYouInterestedIn888vcAccelerator = areYouInterestedIn888vcAccelerator;
        existingPreferences.whatTypeOfMentorshipServicesDoYouOfferAsAMentor = whatTypeOfMentorshipServicesDoYouOfferAsAMentor;
        existingPreferences.iConfirmThatIAmReadyForAnyVerificationProcess = iConfirmThatIAmReadyForAnyVerificationProcess;
        await existingPreferences.save();
        return res.status(200).json({
            success: true,
            message: "Mentorship preferences updated successfully",
            preferences: existingPreferences
        });
    }

    const newPreferences = await MentorshipPreferences.create({
        mentorId: existingMentor._id,
        howManyHoursCanYouDedicateToTheMentorshipProcessForAStartup,
        areYouInterestedIn888vcAccelerator,
        whatTypeOfMentorshipServicesDoYouOfferAsAMentor,
        iConfirmThatIAmReadyForAnyVerificationProcess
    });
    existingMentor.mentorshipPreferences = newPreferences._id;
    await existingMentor.save();
    return res.status(200).json({
        success: true,
        message: "Mentorship preferences created successfully",
        preferences: newPreferences
    });
});






export const handleGetMentorPreferences = TryCatch(async (req, res, next) => {
    const mentor = await Mentor.findOne({ userId: req.user._id }).populate("mentorshipPreferences");
    if (!mentor) {
        return res.status(200).json({
            success: true,
            message: "Mentor not found",
            redirect: "/mentor/onboard/profile"
        });
    }
    const preferences = await MentorshipPreferences.findOne({ mentorId: mentor._id });
    if (!preferences) {
        return res.status(200).json({
            success: true,
            message: "Mentor preferences not found",
            redirect: "/mentor/onboard/mentorship-preferences"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Mentor preferences fetched successfully",
        preferences: preferences
    });
}); 