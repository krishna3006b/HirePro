"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("./errorHandler");
const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            throw new errorHandler_1.AppError('No token provided', 401);
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(new errorHandler_1.AppError('Invalid token', 401));
        }
        else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            next(new errorHandler_1.AppError('Token expired', 401));
        }
        else {
            next(error);
        }
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new errorHandler_1.AppError('Unauthorized', 401);
        }
        if (!roles.includes(req.user.role)) {
            throw new errorHandler_1.AppError('Insufficient permissions', 403);
        }
        next();
    };
};
exports.authorize = authorize;
const optionalAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            const jwtSecret = process.env.JWT_SECRET;
            if (jwtSecret) {
                const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
                req.user = decoded;
            }
        }
        next();
    }
    catch (error) {
        // Silently fail for optional auth
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.js.map