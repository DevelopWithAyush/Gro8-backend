import express from "express";
import { mentorExpertiseValidator, mentorMentorshipPreferencesValidator, mentorProfileDetailsValidator } from "../middleware/express-validator/mentor-validator.js";
import { handleCreateMentorProfile } from "../controllers/mentorController/profileDetailsController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";


const router = express.Router();


// Mentor Profile Details
router.use(isAuthenticated);
router.post("/onboard/profile", mentorProfileDetailsValidator(), handleCreateMentorProfile)
// router.put("/onboard/profile", mentorProfileDetailsValidator(), handleUpdateMentorProfile)
// router.get("/onboard/profile", handleGetMentorProfile)

// Mentor Expertise
// router.post("/onboard/expertise", mentorExpertiseValidator(), handleCreateMentorExpertise)
// router.put("/onboard/expertise", mentorExpertiseValidator(), handleUpdateMentorExpertise)
// router.get("/onboard/expertise", handleGetMentorExpertise)

// Mentor Mentorship Preferences
// router.post("/onboard/mentorship-preferences", mentorMentorshipPreferencesValidator(), handleCreateMentorMentorshipPreferences)
// router.put("/onboard/mentorship-preferences", mentorMentorshipPreferencesValidator(), handleUpdateMentorMentorshipPreferences)
// router.get("/onboard/mentorship-preferences", handleGetMentorMentorshipPreferences)



export default router;








