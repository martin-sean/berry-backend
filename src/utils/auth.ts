import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import Account from '../data/models/Account';

const refreshTokenName = 'rid';

export interface AccessToken {
  userId: number;
  username: string;
  moderator: boolean;
}

export interface RefreshToken {
  userId: number;
}

export const createAccessToken = (account: Account) => {
  return sign(
    { userId: account.id, username: account.username, moderator: account.moderator },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' },      
  );
}

const createRefreshToken = (account: Account) => {
  return sign(
    { userId: account.id },
    process.env.RT_SECRET!,
    { expiresIn: '7d' },
  )
}

export const sendRefreshToken = (res: Response, account: Account) => {
  res.cookie(
    refreshTokenName,
    createRefreshToken(account),
    // { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }
    { httpOnly: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }
  );
}

export const clearRefreshToken = (res: Response) => {
  return res.status(200).clearCookie(refreshTokenName).send();
}