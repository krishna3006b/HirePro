/**
 * JWT Payload Interface
 */
export interface JwtPayload {
    userId: string;
    email: string;
    role: UserRole;
    companyId?: string;
    tenantId?: string;
}
/**
 * User Roles
 */
export declare enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    COMPANY_ADMIN = "COMPANY_ADMIN",
    HR_MANAGER = "HR_MANAGER",
    HR_RECRUITER = "HR_RECRUITER",
    CANDIDATE = "CANDIDATE"
}
/**
 * Token Types
 */
export declare enum TokenType {
    ACCESS = "ACCESS",
    REFRESH = "REFRESH",
    RESET_PASSWORD = "RESET_PASSWORD",
    EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
}
/**
 * JWT Service
 */
export declare class JwtService {
    private static readonly ACCESS_TOKEN_SECRET;
    private static readonly REFRESH_TOKEN_SECRET;
    private static readonly ACCESS_TOKEN_EXPIRY;
    private static readonly REFRESH_TOKEN_EXPIRY;
    /**
     * Generate Access Token
     */
    static generateAccessToken(payload: JwtPayload): string;
    /**
     * Generate Refresh Token
     */
    static generateRefreshToken(payload: JwtPayload): string;
    /**
     * Verify Access Token
     */
    static verifyAccessToken(token: string): JwtPayload;
    /**
     * Verify Refresh Token
     */
    static verifyRefreshToken(token: string): JwtPayload;
    /**
     * Generate Token Pair
     */
    static generateTokenPair(payload: JwtPayload): {
        accessToken: string;
        refreshToken: string;
    };
}
/**
 * Password Service
 */
export declare class PasswordService {
    private static readonly SALT_ROUNDS;
    /**
     * Hash Password
     */
    static hash(password: string): Promise<string>;
    /**
     * Compare Password
     */
    static compare(password: string, hashedPassword: string): Promise<boolean>;
    /**
     * Validate Password Strength
     */
    static validateStrength(password: string): {
        valid: boolean;
        errors: string[];
    };
}
/**
 * Permission Checker
 */
export declare class PermissionService {
    private static roleHierarchy;
    /**
     * Check if user has required role or higher
     */
    static hasRole(userRole: UserRole, requiredRole: UserRole): boolean;
    /**
     * Check if user has specific permission
     */
    static hasPermission(userRole: UserRole, resource: string, action: string): boolean;
    /**
     * Get all permissions for a role
     */
    private static getPermissions;
}
//# sourceMappingURL=auth.d.ts.map