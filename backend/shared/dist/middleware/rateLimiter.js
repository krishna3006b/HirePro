"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictLimiter = exports.apiLimiter = exports.authLimiter = exports.createRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const createRateLimiter = (options) => {
    return (0, express_rate_limit_1.default)({
        windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
        max: options.max || 100, // Limit each IP to 100 requests per windowMs
        message: options.message || 'Too many requests, please try again later.',
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        handler: (req, res) => {
            res.status(429).json({
                success: false,
                error: {
                    code: 'RATE_LIMIT_EXCEEDED',
                    message: options.message || 'Too many requests, please try again later.',
                },
                timestamp: new Date().toISOString(),
            });
        },
    });
};
exports.createRateLimiter = createRateLimiter;
exports.authLimiter = (0, exports.createRateLimiter)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per 15 minutes
    message: 'Too many authentication attempts, please try again later.',
});
exports.apiLimiter = (0, exports.createRateLimiter)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
    message: 'Too many API requests, please try again later.',
});
exports.strictLimiter = (0, exports.createRateLimiter)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests per 15 minutes
    message: 'Too many requests to this endpoint, please try again later.',
});
//# sourceMappingURL=rateLimiter.js.map