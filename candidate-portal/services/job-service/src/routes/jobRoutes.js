import express from "express";
import {
  getJobs,
  getJobById,
  searchJobs,
  getFilters
} from "../controllers/jobController.js";
import { applyForJob } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getJobs);
router.get("/search", searchJobs);
router.get("/filters", getFilters);
router.get("/:id", getJobById);

// Protected routes
router.post("/:id/apply", protect, applyForJob);

export default router;
