import express from 'express';
import { login, refreshTokenHandler, signup, logout } from '../controllers/localAuthController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import passport from 'passport';

const localRouter = express.Router();

localRouter.post('/login', passport.authenticate('local', { session: false }), login);
localRouter.post('/refresh-token', refreshTokenHandler);
localRouter.post('/signup', signup);
localRouter.post('/logout', authenticateJWT, logout);

export default localRouter;
