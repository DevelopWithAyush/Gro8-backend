import express from "express";
import { handleLinkedinCallback } from "../controllers/linkedinAuthController.js";

const router = express.Router();

router.get("/callback", handleLinkedinCallback);

export default router;