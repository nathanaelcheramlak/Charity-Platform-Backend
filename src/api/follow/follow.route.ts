import express from 'express';
import { FollowController } from './follow.controller';
import { authMiddleware } from '@/middleware/auth.middleware';

const app = express.Router();

app.post('/charities/:id/follow', authMiddleware, FollowController.followCharity);
app.delete('/charities/:id/unfollow', authMiddleware, FollowController.unfollowCharity);
app.get('/charities/:id/followers', FollowController.getCharityFollowers);

export default app;
