import Redis from 'ioredis';
import logger from '../utils/logger';

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  keyPrefix?: string;
  maxRetriesPerRequest?: number;
}

let redisClient: Redis | null = null;

export const connectRedis = (config: RedisConfig): Redis => {
  if (redisClient) {
    return redisClient;
  }

  redisClient = new Redis({
    host: config.host,
    port: config.port,
    password: config.password,
    db: config.db || 0,
    keyPrefix: config.keyPrefix || '',
    maxRetriesPerRequest: config.maxRetriesPerRequest || 3,
    retryStrategy: (times: number) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });

  redisClient.on('connect', () => {
    logger.info(`Redis connected: ${config.host}:${config.port}`);
  });

  redisClient.on('error', (err: Error) => {
    logger.error(`Redis error: ${err}`);
  });

  redisClient.on('close', () => {
    logger.warn('Redis connection closed');
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    if (redisClient) {
      await redisClient.quit();
      logger.info('Redis connection closed through app termination');
    }
  });

  return redisClient;
};

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectRedis first.');
  }
  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    logger.info('Redis connection closed');
  }
};

export default { connectRedis, getRedisClient, disconnectRedis };
