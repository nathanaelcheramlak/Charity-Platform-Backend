import express from 'express';
import { LikeController } from './like.controller';
import { authMiddleware } from '@/middleware/auth.middleware';

const app = express.Router();

app.post('/events/:id/like', authMiddleware, LikeController.createLike);
app.delete('/events/:id/unlike', authMiddleware, LikeController.deleteLike);
app.get('/events/:id/likes', LikeController.getLikes);

export default app;
