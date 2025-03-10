import express from 'express';

import { CommentController } from './comment.controller';
import { authMiddleware } from '@/middleware/auth.middleware';

const app = express.Router();

app.get('/events/:id/comments', CommentController.getComments);
app.post('/events/:id/comments', authMiddleware, CommentController.createComment);
app.put('/comments/:id', authMiddleware, CommentController.updateComment); // Owner only
app.delete('/comments/:id', authMiddleware, CommentController.deleteComment);

export default app;
