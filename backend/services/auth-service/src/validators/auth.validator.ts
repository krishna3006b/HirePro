import { z } from 'zod';

// Signup validation schema
export const signupSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    phone: z.string().optional(),
    location: z.string().optional(),
    role: z.enum(['candidate', 'admin', 'recruiter', 'interviewer']).optional(),
    companyId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid company ID').optional(),
  }),
});

// Login validation schema
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    userType: z.enum(['candidate', 'hr']).default('candidate'),
  }),
});

// Refresh token validation schema
export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});

// Change password validation schema
export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  }),
});

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

// Reset password validation schema
export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Reset token is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

export type SignupInput = z.infer<typeof signupSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>['body'];
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>['body'];
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>['body'];
