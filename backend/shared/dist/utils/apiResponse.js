"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpStatus = exports.ApiResponseHelper = void 0;
/**
 * Success Response Helper
 */
class ApiResponseHelper {
    static success(data, message, pagination) {
        return {
            success: true,
            data,
            message,
            pagination,
            timestamp: new Date().toISOString(),
        };
    }
    static error(code, message, details, stack) {
        return {
            success: false,
            error: {
                code,
                message,
                details,
                ...(process.env.NODE_ENV === 'development' && { stack }),
            },
            timestamp: new Date().toISOString(),
        };
    }
    static paginate(data, page, limit, total, message) {
        const totalPages = Math.ceil(total / limit);
        return {
            success: true,
            data,
            message,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
            timestamp: new Date().toISOString(),
        };
    }
}
exports.ApiResponseHelper = ApiResponseHelper;
/**
 * HTTP Status Codes
 */
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["ACCEPTED"] = 202] = "ACCEPTED";
    HttpStatus[HttpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["CONFLICT"] = 409] = "CONFLICT";
    HttpStatus[HttpStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatus[HttpStatus["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatus[HttpStatus["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
/**
 * Error Codes
 */
var ErrorCode;
(function (ErrorCode) {
    // Authentication & Authorization
    ErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorCode["FORBIDDEN"] = "FORBIDDEN";
    ErrorCode["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
    ErrorCode["INVALID_TOKEN"] = "INVALID_TOKEN";
    ErrorCode["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
    // Validation
    ErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorCode["INVALID_INPUT"] = "INVALID_INPUT";
    ErrorCode["MISSING_REQUIRED_FIELD"] = "MISSING_REQUIRED_FIELD";
    // Resource
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["ALREADY_EXISTS"] = "ALREADY_EXISTS";
    ErrorCode["CONFLICT"] = "CONFLICT";
    // Rate Limiting
    ErrorCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    // Server
    ErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorCode["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
    ErrorCode["DATABASE_ERROR"] = "DATABASE_ERROR";
    // Business Logic
    ErrorCode["INSUFFICIENT_PERMISSIONS"] = "INSUFFICIENT_PERMISSIONS";
    ErrorCode["OPERATION_FAILED"] = "OPERATION_FAILED";
    ErrorCode["INVALID_OPERATION"] = "INVALID_OPERATION";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
//# sourceMappingURL=apiResponse.js.map