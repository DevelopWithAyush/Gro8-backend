import express from "express";

const router = express.Router();

router.post("/founder/register", registerFounder);

export default router;