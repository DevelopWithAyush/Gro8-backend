import express from "express";
import { mentorExpertiseValidator, mentorMentorshipPreferencesValidator, mentorProfileDetailsValidator } from "../middleware/express-validator/mentor-validator.js";
import { handleCreateMentorProfile, handleGetMentorProfile } from "../controllers/mentorController/profileDetailsController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { isMentor } from "../middleware/roleMiddleware.js";
import { handleCreateMentorExpertise, handleGetMentorExpertise } from "../controllers/mentorController/mentorExpertise.js";


const router = express.Router();

//  >>>>>>>> Mentor Onboarding Routes <<<<<<<
// Mentor Profile Details
router.use(isAuthenticated);
router.post("/onboard/profile", isMentor, mentorProfileDetailsValidator(), handleCreateMentorProfile)
router.get("/onboard/profile", handleGetMentorProfile)

// Mentor Expertise
router.post("/onboard/expertise", isMentor, mentorExpertiseValidator(), handleCreateMentorExpertise)
router.get("/onboard/expertise", handleGetMentorExpertise)

// Mentor Mentorship Preferences
// router.post("/onboard/mentorship-preferences", mentorMentorshipPreferencesValidator(), handleCreateMentorMentorshipPreferences)
// router.put("/onboard/mentorship-preferences", mentorMentorshipPreferencesValidator(), handleUpdateMentorMentorshipPreferences)
// router.get("/onboard/mentorship-preferences", handleGetMentorMentorshipPreferences)



export default router;








