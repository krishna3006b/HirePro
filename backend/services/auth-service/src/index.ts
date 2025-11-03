import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config';
import { connectDatabase, logger, errorHandler, notFoundHandler } from '@hirepro/shared';
import { connectRedis } from '@hirepro/shared';
import authRoutes from './routes/auth.routes';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: config.serviceName,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use(`${config.apiPrefix}/auth`, authRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Database connection
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase({
      uri: config.mongoUri,
    });

    // Connect to Redis
    connectRedis({
      host: config.redisHost,
      port: config.redisPort,
      password: config.redisPassword,
      keyPrefix: 'auth:',
    });

    // Start server
    app.listen(config.port, () => {
      logger.info(`🚀 Auth Service running on port ${config.port}`);
      logger.info(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
