// Example usage
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/errors/api-error';
import env from '../config/env';

interface DecodedUser {
  id: string;
  email: string;
  role?: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(ApiError.unauthorized('Authentication required'));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedUser;
    req.user = decoded;
    next();
  } catch (error) {
    next(ApiError.unauthorized('Invalid or expired token'));
  }
};
