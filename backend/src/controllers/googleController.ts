import passport from 'passport';
import { generateToken } from '../utils/token';
import { Request, Response } from 'express';

export const googleLogin = () => {
  return passport.authenticate('google', { scope: ['profile', 'email'] });
};
export const authenticateGoogle = passport.authenticate('google', {
  failureRedirect: 'http://localhost:5173/login',
  session: false,
});

export const googleCallback = (req: Request, res: Response) => {
  const payload: any = req.user;
  const newRefreshToken = generateToken(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
  res.cookie('refreshToken', newRefreshToken, {
    secure: false,
    httpOnly: true,
  });
  res.redirect('http://localhost:5173/products');
};
