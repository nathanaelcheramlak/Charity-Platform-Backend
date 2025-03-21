import Joi from 'joi';

export const updateCharitySchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().max(1000),
  phone: Joi.string().pattern(/^\+?[0-9]{10,14}$/),
  location: Joi.string().max(100),
  website: Joi.string().uri().allow(''),
});
