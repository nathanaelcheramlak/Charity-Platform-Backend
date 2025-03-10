import express from 'express';
import { VolunteerController } from './volunteer.controller';
import { authMiddleware } from '@/middleware/auth.middleware';

const app = express.Router();

app.get('/volunteer-opportunities', VolunteerController.getOpportunities);
app.get('/volunteer-opportunities/:id', VolunteerController.getOpportunity);
app.post('/volunteer-opportunities', authMiddleware, VolunteerController.createOpportunity);
app.put('/volunteer-opportunities/:id', authMiddleware, VolunteerController.updateOpportunity);
app.delete('/volunteer-opportunities/:id', authMiddleware, VolunteerController.deleteOpportunity);

app.post(
  '/volunteer-opportunities/:id/apply',
  authMiddleware,
  VolunteerController.createApplication,
);
app.get(
  '/volunteer-opportunities/:id/applicants',
  authMiddleware,
  VolunteerController.getApplicants,
); // Charity Specific
app.put(
  '/volunteer-opportunities/:id/status',
  authMiddleware,
  VolunteerController.updateApplicationStatus,
);

export default app;
