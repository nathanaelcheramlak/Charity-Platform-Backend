import express from 'express';

import { DonationController } from './donation.controller';

const app = express.Router();

app.post('/donations', DonationController.createDonation);
app.get('/donations/:id', DonationController.getDonation);

// Advanced
// app.get('/donations', DonationController.getDonations); // Admin Specific
// app.get('/donations/user/:id', DonationController.getUserDonations);
// app.post('/donations/:id/receipt', DonationController.sendReceipt);
