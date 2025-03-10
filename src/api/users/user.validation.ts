// Example: src/api/users/user.validation.ts
import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  fullname: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,14}$/)
    .required(),
});

export const updateUserSchema = Joi.object({
  fullname: Joi.string().min(3).max(100),
  phone: Joi.string().pattern(/^\+?[0-9]{10,14}$/),
  profilePicture: Joi.string(),
});
