import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  HR_RECRUITER = 'HR_RECRUITER',
  CANDIDATE = 'CANDIDATE',
}

/**
 * Token Types
 */
export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
  RESET_PASSWORD = 'RESET_PASSWORD',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

/**
 * JWT Service
 */
export class JwtService {
  private static readonly ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
  private static readonly ACCESS_TOKEN_EXPIRY = '15m';
  private static readonly REFRESH_TOKEN_EXPIRY = '7d';

  /**
   * Generate Access Token
   */
  static generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(
      { ...payload, type: TokenType.ACCESS },
      this.ACCESS_TOKEN_SECRET,
      { expiresIn: this.ACCESS_TOKEN_EXPIRY }
    );
  }

  /**
   * Generate Refresh Token
   */
  static generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(
      { ...payload, type: TokenType.REFRESH },
      this.REFRESH_TOKEN_SECRET,
      { expiresIn: this.REFRESH_TOKEN_EXPIRY }
    );
  }

  /**
   * Verify Access Token
   */
  static verifyAccessToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.ACCESS_TOKEN_SECRET) as JwtPayload & { type: TokenType };
      
      if (decoded.type !== TokenType.ACCESS) {
        throw new Error('Invalid token type');
      }
      
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired');
      }
      throw new Error('Invalid token');
    }
  }

  /**
   * Verify Refresh Token
   */
  static verifyRefreshToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.REFRESH_TOKEN_SECRET) as JwtPayload & { type: TokenType };
      
      if (decoded.type !== TokenType.REFRESH) {
        throw new Error('Invalid token type');
      }
      
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token expired');
      }
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Generate Token Pair
   */
  static generateTokenPair(payload: JwtPayload): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}

/**
 * Password Service
 */
export class PasswordService {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Hash Password
   */
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compare Password
   */
  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Validate Password Strength
   */
  static validateStrength(password: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

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

/**
 * Permission Checker
 */
export class PermissionService {
  private static roleHierarchy: Record<UserRole, number> = {
    [UserRole.SUPER_ADMIN]: 5,
    [UserRole.COMPANY_ADMIN]: 4,
    [UserRole.HR_MANAGER]: 3,
    [UserRole.HR_RECRUITER]: 2,
    [UserRole.CANDIDATE]: 1,
  };

  /**
   * Check if user has required role or higher
   */
  static hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
    return this.roleHierarchy[userRole] >= this.roleHierarchy[requiredRole];
  }

  /**
   * Check if user has specific permission
   */
  static hasPermission(
    userRole: UserRole,
    resource: string,
    action: string
  ): boolean {
    const permissions = this.getPermissions(userRole);
    return permissions[resource]?.includes(action) || false;
  }

  /**
   * Get all permissions for a role
   */
  private static getPermissions(role: UserRole): Record<string, string[]> {
    const permissions: Record<UserRole, Record<string, string[]>> = {
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
