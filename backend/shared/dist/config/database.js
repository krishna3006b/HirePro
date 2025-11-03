"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const connectDatabase = async (config) => {
    try {
        const options = {
            maxPoolSize: 10,
            minPoolSize: 5,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 5000,
            ...config.options,
        };
        await mongoose_1.default.connect(config.uri, options);
        logger_1.default.info(`MongoDB Connected: ${mongoose_1.default.connection.host}`);
        // Handle connection events
        mongoose_1.default.connection.on('error', (err) => {
            logger_1.default.error(`MongoDB connection error: ${err}`);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            logger_1.default.warn('MongoDB disconnected');
        });
        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose_1.default.connection.close();
            logger_1.default.info('MongoDB connection closed through app termination');
            process.exit(0);
        });
    }
    catch (error) {
        logger_1.default.error(`Database connection failed: ${error}`);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    await mongoose_1.default.connection.close();
    logger_1.default.info('MongoDB connection closed');
};
exports.disconnectDatabase = disconnectDatabase;
exports.default = exports.connectDatabase;
//# sourceMappingURL=database.js.map