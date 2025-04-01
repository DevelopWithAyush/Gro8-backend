import { ErrorHandler, TryCatch } from "../../utility/utility.js";
import { validationResult } from "express-validator";

import Mentor from "../../model/mentor/mentor.js";

export const handleCreateMentorProfile = TryCatch(async (req, res, next) => {
    const { country, state, city, gender, industryPreference, whatCountryyouFillingTaxReturnsIn } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array()[0].msg, 400));
    }





    const mentor = await Mentor.create({ userId: req.user._id, profileDetails: { country, state, city, gender, industryPreference, whatCountryyouFillingTaxReturnsIn } });
    res.status(201).json(mentor);
})