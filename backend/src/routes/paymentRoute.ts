import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { checkout, getPurchased, webhook } from '../controllers/paymentController';

const paymentRouter = express.Router();

paymentRouter.post('/checkout', authenticateJWT, checkout);
paymentRouter.get('/purchased', authenticateJWT, getPurchased);
paymentRouter.post('/webhook', webhook);

export default paymentRouter; 
