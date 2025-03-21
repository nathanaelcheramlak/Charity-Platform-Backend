import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';
import { ApiError } from '../../utils/errors/api-error';
import { resourceUsage } from 'process';
import { error } from 'console';

export const UserController = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await UserService.getUserById(id);
      res.json(200).json({
        success: true,
        data: user,
      });
      return;
    } catch (error) {
      next(error);
    }
  },

  getMe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Unauthorized');
        return;
      }

      const user = await UserService.getMe(req.user.id);
      res.status(200).json({
        success: true,
        data: user,
      });
      return;
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Unauthorized');
        return;
      }
      const user = await UserService.updateUser(req.user.id, req.body);
      res.status(200).json({
        success: true,
        data: user,
      });
      return;
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw ApiError.unauthorized('Unauthorized');
        return;
      }
      await UserService.deleteUser(req.user.id);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
      return;
    } catch (error) {
      next(error);
    }
  },

  getDonations: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getCharities: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  myApplications: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};
