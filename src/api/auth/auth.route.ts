import express from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import AuthController from './auth.controller';
import validate from '../../middleware/validation.middleware';
import {
  loginCharitySchema,
  loginSchema,
  registerCharitySchema,
  registerSchema,
} from './auth.validation';

const app = express.Router();

app.post('/register', validate(registerSchema), AuthController.register);
app.post('/login', validate(loginSchema), AuthController.login);
app.post('/logout', authMiddleware, AuthController.logout);

app.post('/refresh-token', AuthController.refreshToken);
app.post('/forgot-password', AuthController.forgotPassword);
app.post('/reset-password', AuthController.resetPassword);
app.post('/verify-email', AuthController.verifyEmail);

app.post('/charity/register', validate(registerCharitySchema), AuthController.registerCharity);
app.post('/charity/login', validate(loginCharitySchema), AuthController.loginCharity);

export default app;
