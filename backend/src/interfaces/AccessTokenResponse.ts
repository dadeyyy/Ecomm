import { Response, Request } from 'express';
import 'express';

export interface AccessTokenResponse extends Response {
  newAccessToken?: string;
}

export interface RequestAccessTokenType extends Request {
  newAccessToken?: string;
}
