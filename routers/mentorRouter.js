import express from "express";
import { mentorExpertiseValidator, mentorMentorshipPreferencesValidator } from "../middleware/express-validator/mentor-validator";


const router = express.Router();


// Mentor Profile Details
router.post("/onboard/mentor/profile", mentorProfileDetailsValidator(), handleCreateMentorProfile)
router.put("/onboard/mentor/profile", mentorProfileDetailsValidator(), handleUpdateMentorProfile)
router.get("/onboard/mentor/profile", handleGetMentorProfile)

// Mentor Expertise
router.post("/onboard/mentor/expertise", mentorExpertiseValidator(), handleCreateMentorExpertise)
router.put("/onboard/mentor/expertise", mentorExpertiseValidator(), handleUpdateMentorExpertise)
router.get("/onboard/mentor/expertise", handleGetMentorExpertise)

// Mentor Mentorship Preferences
router.post("/onboard/mentor/mentorship-preferences", mentorMentorshipPreferencesValidator(), handleCreateMentorMentorshipPreferences)
router.put("/onboard/mentor/mentorship-preferences", mentorMentorshipPreferencesValidator(), handleUpdateMentorMentorshipPreferences)
router.get("/onboard/mentor/mentorship-preferences", handleGetMentorMentorshipPreferences)







export default router;








