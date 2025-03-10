import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';
import { ApiError } from '../../utils/errors/api-error';

export const UserController = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getMe: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
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
