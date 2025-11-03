import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || '8001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  serviceName: 'company-service',

  // Database
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/hirepro-company',
  
  // Redis
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
  redisPassword: process.env.REDIS_PASSWORD,

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // API
  apiPrefix: process.env.API_PREFIX || '/api/v1',

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};
