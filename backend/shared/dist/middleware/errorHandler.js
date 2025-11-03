"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = exports.AppError = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const apiResponse_1 = require("../utils/apiResponse");
class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let isOperational = false;
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        isOperational = err.isOperational;
    }
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    }
    else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized';
    }
    else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }
    else if (err.name === 'MongoError' || err.name === 'MongoServerError') {
        statusCode = 500;
        message = 'Database error';
    }
    // Log error
    if (statusCode >= 500) {
        logger_1.default.error(`${err.name}: ${err.message}`, {
            stack: err.stack,
            url: req.originalUrl,
            method: req.method,
            body: req.body,
        });
    }
    else {
        logger_1.default.warn(`${err.name}: ${err.message}`, {
            url: req.originalUrl,
            method: req.method,
        });
    }
    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    res.status(statusCode).json(apiResponse_1.ApiResponseHelper.error(apiResponse_1.ErrorCode.INTERNAL_SERVER_ERROR, message, undefined, isDevelopment ? err.stack : undefined));
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res, next) => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404);
    next(error);
};
exports.notFoundHandler = notFoundHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map