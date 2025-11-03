import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { AppError } from './errorHandler';
import logger from '../utils/logger';

export const validate = (schema: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        logger.warn('Validation error', { errors: errorMessages });
        next(new AppError(`Validation failed: ${JSON.stringify(errorMessages)}`, 400));
      } else {
        next(error);
      }
    }
  };
};

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        logger.warn('Body validation error', { errors: errorMessages });
        next(new AppError(`Validation failed: ${JSON.stringify(errorMessages)}`, 400));
      } else {
        next(error);
      }
    }
  };
};

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        logger.warn('Query validation error', { errors: errorMessages });
        next(new AppError(`Validation failed: ${JSON.stringify(errorMessages)}`, 400));
      } else {
        next(error);
      }
    }
  };
};

export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        logger.warn('Params validation error', { errors: errorMessages });
        next(new AppError(`Validation failed: ${JSON.stringify(errorMessages)}`, 400));
      } else {
        next(error);
      }
    }
  };
};
