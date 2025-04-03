import express, { application } from "express";
import { loginValidator, roleValidator, sendOtpValidator, verifyOtpValidator } from "../middleware/express-validator/auth-validator.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { handleGetMe, handleLogin, handleLogout, handleSelectNewRole, handleSelectRole, handleSendOtp, handleVerifyOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtpValidator(), handleSendOtp)
router.post("/login", loginValidator(), handleLogin)
router.post("/verify-otp", verifyOtpValidator(), handleVerifyOtp)
router.use(isAuthenticated)
router.get("/logout", handleLogout)
router.get("/me", handleGetMe)
router.put("/select-new-role", roleValidator(), handleSelectNewRole)
router.post("/select-role", roleValidator(), handleSelectRole)
export default router;