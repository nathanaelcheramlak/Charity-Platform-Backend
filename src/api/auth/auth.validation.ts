import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().max(100).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(10)
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required(),
});

export const registerCharitySchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(10)
    .required(),
  description: Joi.string().max(500).optional(),
  location: Joi.string().max(100).optional(),
  website: Joi.string().uri().optional(),
  coverPicture: Joi.string().uri().optional(),
  logo: Joi.string().uri().optional(),
});

export const loginCharitySchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required(),
});
