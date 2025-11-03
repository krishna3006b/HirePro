/**
 * Standard API Response Structure
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: ApiError;
    pagination?: PaginationData;
    timestamp: string;
}
/**
 * Error Response Structure
 */
export interface ApiError {
    code: string;
    message: string;
    details?: any[];
    stack?: string;
}
/**
 * Pagination Data
 */
export interface PaginationData {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
/**
 * Success Response Helper
 */
export declare class ApiResponseHelper {
    static success<T>(data: T, message?: string, pagination?: PaginationData): ApiResponse<T>;
    static error(code: string, message: string, details?: any[], stack?: string): ApiResponse;
    static paginate<T>(data: T[], page: number, limit: number, total: number, message?: string): ApiResponse<T[]>;
}
/**
 * HTTP Status Codes
 */
export declare enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503
}
/**
 * Error Codes
 */
export declare enum ErrorCode {
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    TOKEN_EXPIRED = "TOKEN_EXPIRED",
    INVALID_TOKEN = "INVALID_TOKEN",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    INVALID_INPUT = "INVALID_INPUT",
    MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",
    NOT_FOUND = "NOT_FOUND",
    ALREADY_EXISTS = "ALREADY_EXISTS",
    CONFLICT = "CONFLICT",
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
    DATABASE_ERROR = "DATABASE_ERROR",
    INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",
    OPERATION_FAILED = "OPERATION_FAILED",
    INVALID_OPERATION = "INVALID_OPERATION"
}
//# sourceMappingURL=apiResponse.d.ts.map