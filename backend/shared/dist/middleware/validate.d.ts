import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
export declare const validate: (schema: z.ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateBody: (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateQuery: (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateParams: (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map