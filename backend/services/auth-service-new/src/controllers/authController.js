import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Candidate from "../models/Candidate.js";
import { validateSignup, validateLogin } from "../utils/validation.js";
import logger from "../utils/logger.js";

// Generate JWT tokens
const generateAccessToken = (candidateId) => {
  return jwt.sign(
    { id: candidateId, type: "candidate" },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m" }
  );
};

const generateRefreshToken = (candidateId) => {
  return jwt.sign(
    { id: candidateId, type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d" }
  );
};

// @desc    Register new candidate
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
  try {
    // Validate input
    const { error } = validateSignup(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { email, password, fullName, phone } = req.body;

    // Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ email: email.toLowerCase() });
    if (existingCandidate) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create candidate
    const candidate = await Candidate.create({
      email: email.toLowerCase(),
      passwordHash,
      fullName,
      phone: phone || undefined,
      source: req.body.source || "website"
    });

    // Generate tokens
    const accessToken = generateAccessToken(candidate._id);
    const refreshToken = generateRefreshToken(candidate._id);

    // Save refresh token to database
    candidate.refreshTokens.push({ token: refreshToken });
    await candidate.save();

    logger.info(`New candidate registered: ${email}`);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        candidate: {
          id: candidate._id,
          email: candidate.email,
          fullName: candidate.fullName,
          isProfileComplete: candidate.isProfileComplete
        },
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    logger.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration"
    });
  }
};

// @desc    Login candidate
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    // Validate input
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { email, password } = req.body;

    // Find candidate and include password
    const candidate = await Candidate.findOne({ 
      email: email.toLowerCase() 
    }).select("+passwordHash");

    if (!candidate) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check if account is active
    if (!candidate.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account has been deactivated. Please contact support."
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, candidate.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(candidate._id);
    const refreshToken = generateRefreshToken(candidate._id);

    // Save refresh token
    candidate.refreshTokens.push({ token: refreshToken });
    candidate.lastLogin = new Date();
    await candidate.save();

    logger.info(`Candidate logged in: ${email}`);

    // Remove password from response
    const candidateData = candidate.toJSON();
    delete candidateData.passwordHash;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        candidate: {
          id: candidate._id,
          email: candidate.email,
          fullName: candidate.fullName,
          isProfileComplete: candidate.isProfileComplete,
          profileCompletionPercentage: candidate.profileCompletionPercentage
        },
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required"
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Find candidate and check if refresh token exists
    const candidate = await Candidate.findOne({
      _id: decoded.id,
      "refreshTokens.token": refreshToken
    });

    if (!candidate) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(candidate._id);

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken
      }
    });

  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token"
      });
    }

    logger.error("Refresh token error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// @desc    Logout candidate
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken && req.candidate) {
      // Remove refresh token from database
      await Candidate.findByIdAndUpdate(req.candidate.id, {
        $pull: { refreshTokens: { token: refreshToken } }
      });
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    logger.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout"
    });
  }
};

// @desc    Verify token and get candidate info
// @route   GET /api/auth/verify
// @access  Private
export const verifyToken = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.candidate.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        candidate: {
          id: candidate._id,
          email: candidate.email,
          fullName: candidate.fullName,
          isProfileComplete: candidate.isProfileComplete,
          profileCompletionPercentage: candidate.profileCompletionPercentage
        }
      }
    });

  } catch (error) {
    logger.error("Verify token error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
