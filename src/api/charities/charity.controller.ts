import { Request, Response, NextFunction } from 'express';
import { getPaginationParams } from '../../utils/helpers/pagination.helper';
import CharityService from './charity.service';
import logger from '../../config/logger';
import { ApiError } from '../../utils/errors/api-error';

export const CharityController = {
  getCharities: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Pagination and Filter Parameters
      const { page, limit } = getPaginationParams(req.query);
      const filters = {
        name: req.query.name as string,
        location: req.query.location as string,
      };

      const { charities, totalCount, totalPages } = await CharityService.getCharities(
        page,
        limit,
        filters,
      );

      res.status(200).json({
        success: true,
        data: charities,
        meta: {
          page,
          limit,
          totalCount,
          totalPages,
        },
      });
      return;
    } catch (error: any) {
      logger.error(`Failed to get charities: ${error.message}`);
      next(error);
    }
  },

  getCharity: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const charity = await CharityService.getCharity(id);

      if (!charity) {
        next(ApiError.notFound('Charity not found'));
        return;
      }

      res.status(200).json({
        success: true,
        data: charity,
      });
      return;
    } catch (error: any) {
      logger.error(`Failed to get charity: ${error.message}`);
      next(error);
    }
  },

  getCharityEvents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { page, limit } = getPaginationParams(req.query);

      // Check if charity exists
      const charityExists = await CharityService.getCharity(id);
      if (!charityExists) {
        next(ApiError.notFound('Charity not found'));
        return;
      }

      const { events, totalCount, totalPages } = await CharityService.getCharityEvents(
        id,
        page,
        limit,
      );

      res.status(200).json({
        success: true,
        data: events,
        meta: {
          page,
          limit,
          totalCount,
          totalPages,
        },
      });
      return;
    } catch (error: any) {
      logger.error(`Failed to get charity events: ${error.message}`);
      next(error);
    }
  },

  getCharityDonations: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getCharityFollowers: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getCharityVolunteerOpportunities: async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getMyCharity: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('getMyChar', req.user);
      if (!req.user) {
        next(ApiError.unauthorized('Unauthorized'));
        return;
      }
      const charity = await CharityService.getMyCharity(req.user.id);

      res.status(200).json({
        success: true,
        data: charity,
      });
      return;
    } catch (error: any) {
      logger.error(`Failed to get my charity: ${error.message}`);
      next(error);
    }
  },

  updateMyCharity: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        next(ApiError.unauthorized('Unauthorized'));
        return;
      }

      const { name, phone, location, description, website, logo, coverPicture } = req.body;
      const charity = await CharityService.updateMyCharity(req.user.id, {
        name,
        phone,
        location,
        description,
        website,
        logo,
        coverPicture,
      });

      res.status(200).json({
        success: true,
        data: charity,
      });
      return;
    } catch (error: any) {
      logger.error(`Failed to update charity: ${error.message}`);
      next(error);
    }
  },

  deleteMyCharity: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        next(ApiError.unauthorized('Unauthorized'));
        return;
      }

      await CharityService.deleteMyCharity(req.user.id);
      res.status(200).json({
        success: true,
        message: 'Charity deleted successfully',
      });
      return;
    } catch (error: any) {
      logger.error(`Failed to delete charity: ${error.message}`);
      next(error);
    }
  },
};
