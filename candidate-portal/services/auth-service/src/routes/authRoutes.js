import express from "express";
import {
  signup,
  login,
  refreshToken,
  logout,
  verifyToken
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshToken);

// Protected routes
router.post("/logout", protect, logout);
router.get("/verify", protect, verifyToken);

export default router;
