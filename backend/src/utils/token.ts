import { Request } from 'express';
import jwt, {
  JwtPayload,
  PrivateKey,
  Secret,
  SignOptions,
  VerifyErrors,
} from 'jsonwebtoken';
import { PayloadProps } from '../interfaces/AuthTypes';

export const generateToken = (
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret | PrivateKey,
  options?: SignOptions
) => {
  return jwt.sign(payload, secretOrPrivateKey, options);
};

const verifyTokenPromise = (
  token: string,
  secret: string
): Promise<JwtPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject('Invalid or expired token!');
      }

      resolve(decoded as JwtPayload | string);
    });
  });
};

export const verifyToken = async (refreshToken: string, secret: string) => {
  try {
    const decode = (await verifyTokenPromise(
      refreshToken,
      secret
    )) as JwtPayload;
    const payload: PayloadProps = {
      id: decode.id,
      username: decode.username,
      email: decode.email,
    };

    const newAccessToken = generateToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '1h' }
    );

    return { newAccessToken, payload };
  } catch (e) {
    console.error('Error in verifyToken:', e);
    throw new Error('Failed to verify token');
  }
};
