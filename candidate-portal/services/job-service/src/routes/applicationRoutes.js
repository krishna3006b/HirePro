import express from "express";
import {
  getMyApplications,
  getApplicationById,
  withdrawApplication
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All application routes are protected
router.use(protect);

router.get("/my-applications", getMyApplications);
router.get("/:id", getApplicationById);
router.put("/:id/withdraw", withdrawApplication);

export default router;
