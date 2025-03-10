import logger from '../../config/logger';
import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import { log } from 'console';
import { ApiError } from '@/utils/errors/api-error';

const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, fullname, password, phone } = req.body;

      const user = await AuthService.register({ email, fullname, password, phone });
      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
        },
      });
      return;
    } catch (error: any) {
      logger.error(`Registration failed: ${error.message}`);
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login(email, password);

      // Set refresh token in cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.status(200).json({
        success: true,
        message: 'Login Successful',
        data: {
          accessToken,
          user: {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
          },
        },
      });
      return;
    } catch (error: any) {
      logger.error(`Login failed: ${error.message}`);
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('refreshToken');
      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
      return;
    } catch (error: any) {
      logger.error(`Logout failed: ${error.message}`);
      next(error);
    }
  },

  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.refreshToken;

      if (!token) {
        throw ApiError.unauthorized('Refresh token required');
      }
      const { accessToken, refreshToken: newRefreshToken } =
        await AuthService.refreshAccessToken(token);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          accessToken,
        },
      });
      return;
    } catch (error: any) {
      logger.error(`Token refresh failed: ${error.message}`);
      next(error);
    }
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  registerCharity: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  loginCharity: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
