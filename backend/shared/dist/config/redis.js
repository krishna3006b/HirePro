"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectRedis = exports.getRedisClient = exports.connectRedis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = __importDefault(require("../utils/logger"));
let redisClient = null;
const connectRedis = (config) => {
    if (redisClient) {
        return redisClient;
    }
    redisClient = new ioredis_1.default({
        host: config.host,
        port: config.port,
        password: config.password,
        db: config.db || 0,
        keyPrefix: config.keyPrefix || '',
        maxRetriesPerRequest: config.maxRetriesPerRequest || 3,
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
    });
    redisClient.on('connect', () => {
        logger_1.default.info(`Redis connected: ${config.host}:${config.port}`);
    });
    redisClient.on('error', (err) => {
        logger_1.default.error(`Redis error: ${err}`);
    });
    redisClient.on('close', () => {
        logger_1.default.warn('Redis connection closed');
    });
    // Graceful shutdown
    process.on('SIGINT', async () => {
        if (redisClient) {
            await redisClient.quit();
            logger_1.default.info('Redis connection closed through app termination');
        }
    });
    return redisClient;
};
exports.connectRedis = connectRedis;
const getRedisClient = () => {
    if (!redisClient) {
        throw new Error('Redis client not initialized. Call connectRedis first.');
    }
    return redisClient;
};
exports.getRedisClient = getRedisClient;
const disconnectRedis = async () => {
    if (redisClient) {
        await redisClient.quit();
        redisClient = null;
        logger_1.default.info('Redis connection closed');
    }
};
exports.disconnectRedis = disconnectRedis;
exports.default = { connectRedis: exports.connectRedis, getRedisClient: exports.getRedisClient, disconnectRedis: exports.disconnectRedis };
//# sourceMappingURL=redis.js.map