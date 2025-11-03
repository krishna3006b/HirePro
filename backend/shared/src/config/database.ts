import mongoose from 'mongoose';
import logger from '../utils/logger';

interface DatabaseConfig {
  uri: string;
  options?: mongoose.ConnectOptions;
}

export const connectDatabase = async (config: DatabaseConfig): Promise<void> => {
  try {
    const options: mongoose.ConnectOptions = {
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      ...config.options,
    };

    await mongoose.connect(config.uri, options);
    logger.info(`MongoDB Connected: ${mongoose.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    logger.error(`Database connection failed: ${error}`);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed');
};

export default connectDatabase;
