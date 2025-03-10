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
