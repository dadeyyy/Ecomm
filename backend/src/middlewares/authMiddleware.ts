import { NextFunction, Response, Request } from 'express';
import passport from 'passport';


type JwtInfo =
  | { name: 'TokenExpiredError'; message: string; expiredAt: Date }
  | { name: 'JsonWebTokenError'; message: string }
  | string
  | undefined;

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    async (err: any, user: Express.User | false | null, info: JwtInfo, status: number | Array<number | undefined>) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
