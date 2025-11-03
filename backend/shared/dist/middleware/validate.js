"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateBody = exports.validate = void 0;
const zod_1 = require("zod");
const errorHandler_1 = require("./errorHandler");
const logger_1 = __importDefault(require("../utils/logger"));
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                logger_1.default.warn('Validation error', { errors: errorMessages });
                next(new errorHandler_1.AppError(`Validation failed: ${JSON.stringify(errorMessages)}`, 400));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validate = validate;
const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                logger_1.default.warn('Body validation error', { errors: errorMessages });
                next(new errorHandler_1.AppError(`Validation failed: ${JSON.stringify(errorMessages)}`, 400));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validateBody = validateBody;
const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                logger_1.default.warn('Query validation error', { errors: errorMessages });
                next(new errorHandler_1.AppError(`Validation failed: ${JSON.stringify(errorMessages)}`, 400));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validateQuery = validateQuery;
const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            req.params = schema.parse(req.params);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                logger_1.default.warn('Params validation error', { errors: errorMessages });
                next(new errorHandler_1.AppError(`Validation failed: ${JSON.stringify(errorMessages)}`, 400));
            }
            else {
                next(error);
            }
        }
    };
};
exports.validateParams = validateParams;
//# sourceMappingURL=validate.js.map