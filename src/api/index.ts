import express from 'express';
import auth from './auth/auth.route';
import charity from './charities/charity.route'

const app = express.Router();

app.use('/auth', auth);
app.use('/charity', charity)

export default app;
