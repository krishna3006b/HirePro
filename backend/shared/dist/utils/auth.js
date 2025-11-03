"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = exports.PasswordService = exports.JwtService = exports.TokenType = exports.UserRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * User Roles
 */
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["COMPANY_ADMIN"] = "COMPANY_ADMIN";
    UserRole["HR_MANAGER"] = "HR_MANAGER";
    UserRole["HR_RECRUITER"] = "HR_RECRUITER";
    UserRole["CANDIDATE"] = "CANDIDATE";
})(UserRole || (exports.UserRole = UserRole = {}));
/**
 * Token Types
 */
var TokenType;
(function (TokenType) {
    TokenType["ACCESS"] = "ACCESS";
    TokenType["REFRESH"] = "REFRESH";
    TokenType["RESET_PASSWORD"] = "RESET_PASSWORD";
    TokenType["EMAIL_VERIFICATION"] = "EMAIL_VERIFICATION";
})(TokenType || (exports.TokenType = TokenType = {}));
/**
 * JWT Service
 */
class JwtService {
    static ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    static REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
    static ACCESS_TOKEN_EXPIRY = '15m';
    static REFRESH_TOKEN_EXPIRY = '7d';
    /**
     * Generate Access Token
     */
    static generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign({ ...payload, type: TokenType.ACCESS }, this.ACCESS_TOKEN_SECRET, { expiresIn: this.ACCESS_TOKEN_EXPIRY });
    }
    /**
     * Generate Refresh Token
     */
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign({ ...payload, type: TokenType.REFRESH }, this.REFRESH_TOKEN_SECRET, { expiresIn: this.REFRESH_TOKEN_EXPIRY });
    }
    /**
     * Verify Access Token
     */
    static verifyAccessToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.ACCESS_TOKEN_SECRET);
            if (decoded.type !== TokenType.ACCESS) {
                throw new Error('Invalid token type');
            }
            return decoded;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new Error('Token expired');
            }
            throw new Error('Invalid token');
        }
    }
    /**
     * Verify Refresh Token
     */
    static verifyRefreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.REFRESH_TOKEN_SECRET);
            if (decoded.type !== TokenType.REFRESH) {
                throw new Error('Invalid token type');
            }
            return decoded;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new Error('Refresh token expired');
            }
            throw new Error('Invalid refresh token');
        }
    }
    /**
     * Generate Token Pair
     */
    static generateTokenPair(payload) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }
}
exports.JwtService = JwtService;
/**
 * Password Service
 */
class PasswordService {
    static SALT_ROUNDS = 12;
    /**
     * Hash Password
     */
    static async hash(password) {
        return bcrypt_1.default.hash(password, this.SALT_ROUNDS);
    }
    /**
     * Compare Password
     */
    static async compare(password, hashedPassword) {
        return bcrypt_1.default.compare(password, hashedPassword);
    }
    /**
     * Validate Password Strength
     */
    static validateStrength(password) {
        const errors = [];
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
}
exports.PasswordService = PasswordService;
/**
 * Permission Checker
 */
class PermissionService {
    static roleHierarchy = {
        [UserRole.SUPER_ADMIN]: 5,
        [UserRole.COMPANY_ADMIN]: 4,
        [UserRole.HR_MANAGER]: 3,
        [UserRole.HR_RECRUITER]: 2,
        [UserRole.CANDIDATE]: 1,
    };
    /**
     * Check if user has required role or higher
     */
    static hasRole(userRole, requiredRole) {
        return this.roleHierarchy[userRole] >= this.roleHierarchy[requiredRole];
    }
    /**
     * Check if user has specific permission
     */
    static hasPermission(userRole, resource, action) {
        const permissions = this.getPermissions(userRole);
        return permissions[resource]?.includes(action) || false;
    }
    /**
     * Get all permissions for a role
     */
    static getPermissions(role) {
        const permissions = {
            [UserRole.SUPER_ADMIN]: {
                companies: ['create', 'read', 'update', 'delete', 'manage_users'],
                jobs: ['create', 'read', 'update', 'delete', 'publish'],
                candidates: ['read', 'update', 'delete', 'invite'],
                assessments: ['create', 'read', 'update', 'delete', 'view_results'],
                analytics: ['read', 'export'],
                settings: ['read', 'update'],
            },
            [UserRole.COMPANY_ADMIN]: {
                jobs: ['create', 'read', 'update', 'delete', 'publish'],
                candidates: ['read', 'update', 'delete', 'invite'],
                assessments: ['create', 'read', 'update', 'delete', 'view_results'],
                analytics: ['read', 'export'],
                settings: ['read', 'update'],
            },
            [UserRole.HR_MANAGER]: {
                jobs: ['create', 'read', 'update', 'delete', 'publish'],
                candidates: ['read', 'update', 'invite'],
                assessments: ['create', 'read', 'view_results'],
                analytics: ['read'],
            },
            [UserRole.HR_RECRUITER]: {
                jobs: ['read', 'update'],
                candidates: ['read', 'update'],
                assessments: ['read', 'view_results'],
            },
            [UserRole.CANDIDATE]: {
                jobs: ['read'],
                profile: ['read', 'update'],
                applications: ['create', 'read'],
            },
        };
        return permissions[role] || {};
    }
}
exports.PermissionService = PermissionService;
//# sourceMappingURL=auth.js.map