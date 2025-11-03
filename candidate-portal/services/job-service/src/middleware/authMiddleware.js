import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route"
      });
    }

    try {
      // Verify token (using same secret as auth service)
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      // Attach candidate info to request
      req.candidate = {
        id: decoded.id,
        type: decoded.type
      };

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired"
      });
    }
  } catch (error) {
    logger.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Server error in authentication"
    });
  }
};
