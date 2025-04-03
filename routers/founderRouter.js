import express from "express";
import { isFounder } from "../middleware/roleMiddleware.js";
import { founderProfileDetailsValidator } from "../middleware/express-validator/founder-validator.js";


const router = express.Router();



//>>>Founder onboarding <<<<<<<

// router.post("/onboard/profile", isFounder, founderProfileDetailsValidator(), handleCreateFounderProfile)
// router.get("/onboard/profile", handleGetFounderProfile)

// router.post("/onboard/startup-details", isFounder, founderStartupDetailsValidator(), handleCreateFounderStartup)
// router.get("/onboard/startup-details", handleGetFounderStartup)

// router.post("/onboard/business-details", isFounder, founderBusinessDetailsValidator(), handleCreateFounderBusiness)
// router.get("/onboard/business-details", handleGetFounderBusiness)

// router.post("/onboard/team-details", isFounder, founderTeamDetailsValidator(), handleCreateFounderTeam)
// router.get("/onboard/team-details", handleGetFounderTeam)

// router.post("/onboard/business-kpi", isFounder, founderBusinessKPIsValidator(), handleCreateFounderBusinessKPIs)
// router.get("/onboard/business-kpi", handleGetFounderBusinessKPIs)


// router.post("/onboard/grants-funding", isFounder, founderGrantsFundingValidator(), handleCreateFounderGrantsFunding)
// router.get("/onboard/grants-funding", handleGetFounderGrantsFunding)

// router.post("/onboard/deal-curation", isFounder, founderDealCurationValidator(), handleCreateFounderDealCuration)
// router.get("/onboard/deal-curation", handleGetFounderDealCuration)

// router.post("/onboard/accelerator-details", isFounder, founderAcceleratorDetailsValidator(), handleCreateFounderAccelerator)
// router.get("/onboard/accelerator-details", handleGetFounderAccelerator)
















router.post("/founder/register", registerFounder);


export default router;