import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '@hirepro/shared';
import { authenticate, optionalAuth } from '@hirepro/shared';
import { authLimiter, strictLimiter } from '@hirepro/shared';
import {
  signupSchema,
  loginSchema,
  refreshTokenSchema,
  changePasswordSchema,
} from '../validators/auth.validator';

const router = Router();
const authController = new AuthController();

// Public routes (with rate limiting)
router.post(
  '/signup',
  strictLimiter, // 10 requests per 15 minutes
  validate(signupSchema),
  authController.signup
);

router.post(
  '/login',
  authLimiter, // 5 requests per 15 minutes
  validate(loginSchema),
  authController.login
);

router.post(
  '/refresh',
  validate(refreshTokenSchema),
  authController.refreshToken
);

router.post(
  '/verify',
  authController.verifyToken
);

// Protected routes (require authentication)
router.post(
  '/logout',
  authenticate,
  authController.logout
);

router.post(
  '/change-password',
  authenticate,
  validate(changePasswordSchema),
  authController.changePassword
);

router.get(
  '/profile',
  authenticate,
  authController.getProfile
);

export default router;
