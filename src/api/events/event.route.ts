import express from 'express';
import { EventController } from './event.controller';
import { authMiddleware } from '@/middleware/auth.middleware';

const app = express.Router();

app.get('/events', EventController.getEvents);
app.get('/events/:id', EventController.getEvent);
app.post('/events', authMiddleware, EventController.createEvent);
app.put('/events/:id', authMiddleware, EventController.updateEvent);
app.delete('/events/:id', authMiddleware, EventController.deleteEvent);

app.get('/events/:id/donations', authMiddleware, EventController.getDonations);
app.post('/events/:id/donate', authMiddleware, EventController.createDonation);

export default app;
