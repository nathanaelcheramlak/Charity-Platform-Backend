import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // JWT Config
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-key',
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || '15m',
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '7d',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  // File upload
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'public/uploads',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
};
