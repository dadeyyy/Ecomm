import express from 'express';
import { authenticateGoogle, googleCallback, googleLogin } from '../controllers/googleController';

const googleRouter = express.Router();

googleRouter.get('/google', googleLogin);
googleRouter.get('/google/callback', authenticateGoogle, googleCallback);

export default googleRouter;
