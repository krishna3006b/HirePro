import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { ApiResponseHelper, ErrorCode } from '../utils/apiResponse';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let isOperational = false;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    isOperational = err.isOperational;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    statusCode = 500;
    message = 'Database error';
  }

  // Log error
  if (statusCode >= 500) {
    logger.error(`${err.name}: ${err.message}`, {
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
    });
  } else {
    logger.warn(`${err.name}: ${err.message}`, {
      url: req.originalUrl,
      method: req.method,
    });
  }

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(statusCode).json(
    ApiResponseHelper.error(
      ErrorCode.INTERNAL_SERVER_ERROR,
      message,
      undefined,
      isDevelopment ? err.stack : undefined
    )
  );
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new AppError(
    `Route ${req.originalUrl} not found`,
    404
  );
  next(error);
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
