import express from 'express';
import auth from './auth/auth.route';

const app = express.Router();

app.use('/auth', auth);

export default app;
