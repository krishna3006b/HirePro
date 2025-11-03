import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"],
  credentials: true
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use("/api/", limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth service is running",
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Auth service running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

export default app;
