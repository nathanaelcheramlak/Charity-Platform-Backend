import express from 'express';
import { CharityController } from './charity.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const app = express.Router();

// Charity-Specific Routes
app.get('/me', authMiddleware, CharityController.getMyCharity);
app.put('/me', authMiddleware, CharityController.updateMyCharity);
app.delete('/me', authMiddleware, CharityController.deleteMyCharity);

// Global Routes
app.get('/', CharityController.getCharities);
app.get('/:id', CharityController.getCharity);
app.get('/:id/events', CharityController.getCharityEvents);

app.get('/charities/:id/donations', CharityController.getCharityDonations);
app.get('/charities/:id/followers', CharityController.getCharityFollowers);
app.get(
  '/charities/:id/volunteer-opportunities',
  CharityController.getCharityVolunteerOpportunities,
);

export default app;
