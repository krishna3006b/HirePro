import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponseHelper, asyncHandler } from '@hirepro/shared';
import { 
  SignupInput, 
  LoginInput, 
  RefreshTokenInput,
  ChangePasswordInput 
} from '../validators/auth.validator';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Signup endpoint
  signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data: SignupInput = req.body;
    const userType = data.role && ['admin', 'recruiter', 'interviewer'].includes(data.role) ? 'hr' : 'candidate';

    let result;
    if (userType === 'candidate') {
      result = await this.authService.signupCandidate(data);
    } else {
      result = await this.authService.signupHR(data);
    }

    res.status(201).json(
      ApiResponseHelper.success(result, 'Registration successful')
    );
  });

  // Login endpoint
  login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, userType = 'candidate' }: LoginInput = req.body;

    let result;
    if (userType === 'candidate') {
      result = await this.authService.loginCandidate(email, password);
    } else {
      result = await this.authService.loginHR(email, password);
    }

    res.status(200).json(
      ApiResponseHelper.success(result, 'Login successful')
    );
  });

  // Refresh token endpoint
  refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken }: RefreshTokenInput = req.body;

    const result = await this.authService.refreshAccessToken(refreshToken);

    res.status(200).json(
      ApiResponseHelper.success(result, 'Token refreshed successfully')
    );
  });

  // Logout endpoint
  logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;
    const userId = req.user?.userId;
    const userType = req.user?.role === 'candidate' ? 'candidate' : 'hr';

    if (!userId) {
      return res.status(401).json(
        ApiResponseHelper.error('UNAUTHORIZED', 'User not authenticated')
      );
    }

    await this.authService.logout(userId, refreshToken, userType);

    res.status(200).json(
      ApiResponseHelper.success(null, 'Logout successful')
    );
  });

  // Change password endpoint
  changePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword }: ChangePasswordInput = req.body;
    const userId = req.user?.userId;
    const userType = req.user?.role === 'candidate' ? 'candidate' : 'hr';

    if (!userId) {
      return res.status(401).json(
        ApiResponseHelper.error('UNAUTHORIZED', 'User not authenticated')
      );
    }

    await this.authService.changePassword(userId, currentPassword, newPassword, userType);

    res.status(200).json(
      ApiResponseHelper.success(null, 'Password changed successfully')
    );
  });

  // Get current user profile
  getProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json(
        ApiResponseHelper.error('UNAUTHORIZED', 'User not authenticated')
      );
    }

    res.status(200).json(
      ApiResponseHelper.success(user, 'Profile retrieved successfully')
    );
  });

  // Verify token endpoint
  verifyToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json(
        ApiResponseHelper.error('VALIDATION_ERROR', 'Token is required')
      );
    }

    const decoded = this.authService.verifyToken(token);

    res.status(200).json(
      ApiResponseHelper.success(decoded, 'Token is valid')
    );
  });
}
