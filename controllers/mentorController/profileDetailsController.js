import { ErrorHandler, TryCatch } from "../../utility/utility.js";
import { validationResult } from "express-validator";
import Mentor from "../../model/mentor/mentor.js";
import ProfileDetails from "../../model/mentor/profileDetails.js";

export const handleCreateMentorProfile = TryCatch(async (req, res, next) => {
    const { country, state, city, gender, industryPreference, whatCountryyouFillingTaxReturnsIn } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array()[0].msg, 400));
    }
    let existingMentor = await Mentor.findOne({ userId: req.user._id });

    if (!existingMentor) {
        existingMentor = await Mentor.create({ userId: req.user._id});
    }
    const existingProfileDetails = await ProfileDetails.findOne({ mentorId: existingMentor._id });
    if (existingProfileDetails) {
        existingProfileDetails.country = country;
        existingProfileDetails.state = state;
        existingProfileDetails.city = city;
        existingProfileDetails.gender = gender;
        existingProfileDetails.industryPreference = industryPreference;
        existingProfileDetails.whatCountryyouFillingTaxReturnsIn = whatCountryyouFillingTaxReturnsIn;
        await existingProfileDetails.save();
        res.status(200).json({
            success: true,
            message: "Profile details updated successfully",
            profileDetails: existingProfileDetails
        })
    } else {
        const profileDetails = await ProfileDetails.create({
        mentorId: existingMentor._id,
        country,
        state,
        city,
        gender,
        industryPreference,
        whatCountryyouFillingTaxReturnsIn
        });
        existingMentor.profileDetails = profileDetails._id;
        await existingMentor.save();
        res.status(201).json({
            success: true,
            message: "Profile details created successfully",
            profileDetails: profileDetails
        })
    }
}); 


export const handleGetMentorProfile = TryCatch(async (req, res, next) => {
    const mentor = await Mentor.findOne({ userId: req.user._id }).populate("userId").populate("profileDetails");

    if (!mentor) {
        return res.status(200).json({
            success: true,
            message: "Mentor not found",
            redirect: "/mentor/onboard/profile"
        });
    }

    const existingProfile = await ProfileDetails.findOne({ mentorId: mentor._id });

    if (!existingProfile) {
        return res.status(200).json({
            success: true,
            message: "Profile details not found",
            redirect: "/mentor/onboard/profile"
        });
    }
    res.status(200).json({
        success: true,
        message: "Profile details fetched successfully",
        profileDetails: existingProfile
    })
});