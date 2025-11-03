import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  companyId?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AppError('No token provided', 401);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token expired', 401));
    } else {
      next(error);
    }
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Insufficient permissions', 403);
    }

    next();
  };
};

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      const jwtSecret = process.env.JWT_SECRET;
      if (jwtSecret) {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        req.user = decoded;
      }
    }
    next();
  } catch (error) {
    // Silently fail for optional auth
    next();
  }
};
