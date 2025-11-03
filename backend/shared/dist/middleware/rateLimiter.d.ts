export declare const createRateLimiter: (options: {
    windowMs?: number;
    max?: number;
    message?: string;
}) => import("express-rate-limit").RateLimitRequestHandler;
export declare const authLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const apiLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const strictLimiter: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=rateLimiter.d.ts.map