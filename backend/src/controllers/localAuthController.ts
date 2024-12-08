import passport from 'passport';
import { Request, Response } from 'express';
import { PayloadProps, SignupProps } from '../interfaces/AuthTypes';
import { generateToken, verifyToken } from '../utils/token';
import { findExistingUser, createUser } from '../utils/userQueries';



export const login = (req: Request, res: Response) => {
  console.log('IN LOGINNnn');
  const payload = req.user as PayloadProps;
  const accessToken = generateToken(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '1h',
  });
  const refreshToken = generateToken(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '7d',
  });
  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  });
  res.json({ accessToken, payload });
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { newAccessToken, payload } = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    res.status(200).json({
      message: 'Token refreshed successfully',
      newAccessToken,
      payload,
    });
  } catch (err) {
    console.error('Error refreshing tokens:', err);
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, email }: SignupProps = req.body;
    const user = await findExistingUser(username);
    console.log(user);
    if (user.length > 0) return res.status(409).json({ error: 'User already exists' });
    const newUser = await createUser({ username, email, password });
    console.log('NEW USER', newUser);
    res.status(200).json({ message: 'HEY!' });
  } catch (e) {
    res.json(e);
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    res.clearCookie('refreshToken');
  }
  res.json({ message: 'Successfully logged out' });
};
