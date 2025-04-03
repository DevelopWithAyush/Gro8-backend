import { body } from "express-validator";

export const founderProfileDetailsValidator = () => {
    return [
      body("website").isURL().notEmpty().withMessage("Website is required"),
      body("industryPreference").notEmpty().withMessage("Industry preference is required"),
    ]
}


export const founderStartupDetailsValidator = () => {
    return [
        body("startupName").notEmpty().withMessage("Startup name is required"),
        body("registeredNameOfStartup").notEmpty().withMessage("Registered name of startup is required"),
        body("monthAndYearOfIncorporation").notEmpty().withMessage("Month and year of incorporation is required"),  
        body("aboutStartup").notEmpty().withMessage("About startup is required"),
        body("startupSector").notEmpty().withMessage("Startup sector is required"),
        body("companyType").notEmpty().withMessage("Company type is required"),
        body("startupAddress").notEmpty().withMessage("Startup address is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("state").notEmpty().withMessage("State is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("startupStage").notEmpty().withMessage("Startup stage is required"),
        body("numberOfEmployees").notEmpty().withMessage("Number of employees is required"),
        
    ]
}




