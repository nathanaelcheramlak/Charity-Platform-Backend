import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ApiError } from '../utils/errors/api-error';

const validate =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message.replace(/\"/g, ''));

      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessage,
      });
      return;
    }

    next();
  };

export default validate;
