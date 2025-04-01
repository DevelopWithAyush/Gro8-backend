import { body } from "express-validator";


export const mentorProfileDetailsValidator = () => {
    return [
        body("country").notEmpty().withMessage("Country is required"),
        body("state").notEmpty().withMessage("State is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("gender").notEmpty().isIn(["Male", "Female", "Other"]).withMessage("Gender is required"),
        body("industryPreference").notEmpty().withMessage("Industry preference is required"),
        body("whatCountryyouFillingTaxReturnsIn").notEmpty().withMessage("What country you filling tax returns in is required"),
    ]
}

export const mentorExpertiseValidator = () => {
    return [
        body("expertise").isArray().notEmpty().withMessage("Expertise is required"),
    ]
}

export const mentorMentorshipPreferencesValidator = () => {
    return [
        body("howManyHoursCanYouDedicateToTheMentorshipProcessForAStartup").notEmpty().isIn(["16-47 Hours", "48 hours or more"]).withMessage("How many hours can you dedicate to the mentorship process for a startup is required"),
        body("areYouInterestedIn888vcAccelerator").isBoolean().withMessage("Are you interested in 888vc accelerator is required"),
        body("whatTypeOfMentorshipServicesDoYouOfferAsAMentor").isString().withMessage("What type of mentorship services do you offer as a mentor is required"),
        body("iConfirmThatIAmReadyForAnyVerificationProcess").isBoolean().withMessage("I confirm that I am ready for any verification process is required"),
    ]
}