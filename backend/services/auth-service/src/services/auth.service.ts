import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Candidate, User, ICandidate, IUser } from '@hirepro/shared';
import { AppError } from '@hirepro/shared';
import { config } from '../config';
import {
  SignupInput,
  LoginInput,
  RefreshTokenInput,
  ChangePasswordInput,
} from '../validators/auth.validator';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

interface AuthResponse {
  user: Partial<ICandidate> | Partial<IUser>;
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  // Generate JWT tokens
  private generateAccessToken(userId: string, email: string, role: string, companyId?: string): string {
    const payload: any = { userId, email, role };
    if (companyId) {
      payload.companyId = companyId;
    }
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  }

  private generateRefreshToken(userId: string): string {
    return jwt.sign({ userId, type: 'refresh' }, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshExpiresIn });
  }

    // Signup for candidates
  async signupCandidate(data: SignupInput): Promise<AuthResponse> {
    const { email, password, fullName, phone, location } = data;

    // Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ email: email.toLowerCase() });
    if (existingCandidate) {
      throw new AppError('Email already registered', 409);
    }

    // Create candidate (password will be hashed by pre-save hook)
    const candidate = new Candidate({
      email: email.toLowerCase(),
      passwordHash: password, // Will be hashed by pre-save hook
      fullName,
      phone,
      location,
    });

    // Generate tokens
    const accessToken = this.generateAccessToken(
      String(candidate._id),
      candidate.email,
      'candidate'
    );
    const refreshToken = this.generateRefreshToken(String(candidate._id));

    // Save refresh token
    candidate.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    await candidate.save();

    return {
      user: {
        id: candidate._id,
        email: candidate.email,
        fullName: candidate.fullName,
        role: 'candidate' as any,
      },
      accessToken,
      refreshToken,
    };
  }

  // Signup for HR Users
  async signupHR(data: SignupInput): Promise<AuthResponse> {
    const { email, password, fullName, role, companyId } = data;

    if (!companyId) {
      throw new AppError('Company ID is required for HR signup', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    // Create HR user (password will be hashed by pre-save hook)
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash: password, // Will be hashed by pre-save hook
      fullName,
      role: role || 'hr',
      companyId,
    });

    // Generate tokens
    const accessToken = this.generateAccessToken(
      String(user._id),
      user.email,
      user.role,
      String(user.companyId)
    );
    const refreshToken = this.generateRefreshToken(String(user._id));

    // Save refresh token
    user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    await user.save();

    return {
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        companyId: user.companyId,
      },
      accessToken,
      refreshToken,
    };
  }

  // Login for Candidates
  async loginCandidate(email: string, password: string): Promise<AuthResponse> {
    // Find candidate
    const candidate = await Candidate.findOne({ 
      email: email.toLowerCase() 
    }).select('+passwordHash');

    if (!candidate || !candidate.passwordHash) {
      throw new AppError('Invalid email or password', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, candidate.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(
      String(candidate._id),
      candidate.email,
      'candidate'
    );
    const refreshToken = this.generateRefreshToken(String(candidate._id));

    // Save refresh token and update last login
    candidate.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    candidate.lastLogin = new Date();
    await candidate.save();

    return {
      user: {
        id: candidate._id,
        email: candidate.email,
        fullName: candidate.fullName,
        role: 'candidate' as any,
      },
      accessToken,
      refreshToken,
    };
  }

  // Login for HR Users
  async loginHR(email: string, password: string): Promise<AuthResponse> {
    // Find user
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    }).select('+passwordHash');

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(
      String(user._id),
      user.email,
      user.role,
      String(user.companyId)
    );
    const refreshToken = this.generateRefreshToken(String(user._id));

    // Save refresh token and update last login
    user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    user.lastLogin = new Date();
    await user.save();

    return {
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        companyId: user.companyId,
      },
      accessToken,
      refreshToken,
    };
  }

  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<TokenPair> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret) as any;

      // Try to find in Candidate
      let candidate = await Candidate.findOne({
        _id: decoded.userId,
        'refreshTokens.token': refreshToken,
      });

      if (candidate) {
        const accessToken = this.generateAccessToken(
          String(candidate._id),
          candidate.email,
          'candidate'
        );
        return { accessToken, refreshToken };
      }

      // Try to find in User (HR)
      let user = await User.findOne({
        _id: decoded.userId,
        'refreshTokens.token': refreshToken,
      });

      if (user) {
        const accessToken = this.generateAccessToken(
          String(user._id),
          user.email,
          user.role,
          String(user.companyId)
        );
        return { accessToken, refreshToken };
      }

      throw new AppError('Invalid refresh token', 401);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid refresh token', 401);
      }
      throw error;
    }
  }

  // Logout
  async logout(userId: string, refreshToken: string, userType: 'candidate' | 'hr'): Promise<void> {
    if (userType === 'candidate') {
      await Candidate.findByIdAndUpdate(userId, {
        $pull: { refreshTokens: { token: refreshToken } },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $pull: { refreshTokens: { token: refreshToken } },
      });
    }
  }

  // Change password
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    userType: 'candidate' | 'hr'
  ): Promise<void> {
    if (userType === 'candidate') {
      const candidate = await Candidate.findById(userId).select('+passwordHash');
      if (!candidate || !candidate.passwordHash) {
        throw new AppError('User not found', 404);
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, candidate.passwordHash);
      if (!isPasswordValid) {
        throw new AppError('Current password is incorrect', 401);
      }

      // Set new password (will be hashed by pre-save hook)
      candidate.passwordHash = newPassword;
      candidate.refreshTokens = []; // Clear all refresh tokens
      await candidate.save();
    } else {
      const user = await User.findById(userId).select('+passwordHash');
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isPasswordValid) {
        throw new AppError('Current password is incorrect', 401);
      }

      // Set new password (will be hashed by pre-save hook)
      user.passwordHash = newPassword;
      user.refreshTokens = []; // Clear all refresh tokens
      await user.save();
    }
  }

  // Verify token
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  }
}
