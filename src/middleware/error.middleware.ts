import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import { ApiError } from '../utils/errors/api-error';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    logger.error(`API Error: ${error.message}`);
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }

  // For unhandled errors
  logger.error(`Unhandled Error: ${error.message}`);
  logger.error(error.stack || '');

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};

export default errorMiddleware;
