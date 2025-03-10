import express from 'express';

import { CharityController } from './charity.controller';

const app = express.Router();

// Global Routes
app.get('/charities', CharityController.getCharities);
app.get('/charities/:id', CharityController.getCharity);

app.get('/charities/:id/events', CharityController.getCharityEvents);
app.get('/charities/:id/donations', CharityController.getCharityDonations);
app.get('/charities/:id/followers', CharityController.getCharityFollowers);
app.get(
  '/charities/:id/volunteer-opportunities',
  CharityController.getCharityVolunteerOpportunities,
);

// Charity-Specific Routes
app.get('/charities/me', CharityController.getMyCharity);
app.put('/charities/me', CharityController.updateMyCharity);
app.delete('/charities/me', CharityController.deleteMyCharity);

export default app;
