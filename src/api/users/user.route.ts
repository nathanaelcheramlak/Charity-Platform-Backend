// Example: src/api/users/user.routes.ts
import express from 'express';
import { UserController } from './user.controller';
import validate from '../../middleware/validation.middleware';
import { createUserSchema, updateUserSchema } from './user.validation';
import { authMiddleware } from '../../middleware/auth.middleware';

const app = express.Router();

app.get('/users', authMiddleware, UserController.getUsers); // Admin Only
app.get('/users/:id', UserController.getUser);

app.get('/users/me', authMiddleware, UserController.getMe);
app.put('/users/me', authMiddleware, UserController.updateUser);
app.delete('/users/me', authMiddleware, UserController.deleteUser);

app.get('/users/me/donations', authMiddleware, UserController.getDonations);
app.get('/users/me/charities', authMiddleware, UserController.getCharities);
app.get('/users/me/volunteer-applications', authMiddleware, UserController.myApplications);

// app.post('/', validate(createUserSchema), createUser);
app.put('/:id', authMiddleware, validate(updateUserSchema), UserController.updateUser);
// app.delete('/:id', authMiddleware, deleteUser);

export default app;
