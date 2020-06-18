import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AccessToken } from '../utils/auth';

export default async (req: Request, res: Response, next: NextFunction) => {
  // Get authorization header
  const authorization = req.headers['authorization'];

  // Check if the authorization header was provided
  if (!authorization) return res.status(401).send();

  // Validate
  try {
    // Get token from header (Bearer XXXXXXXXX)
    const token = authorization.split(" ")[1];
    // Get the token data
    const tokenData = verify(token, process.env.JWT_SECRET!) as AccessToken;
    // Pass the user info to next middleware
    res.locals.userId = tokenData.userId;
    res.locals.username = tokenData.username;
    res.locals.isMod = tokenData.moderator;
    next();
  } catch (error) {
    // Unauthorised
    return res.status(401).send();
  }
}