import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AccessToken, createAccessToken } from '../utils/auth';

export default async (req: Request, res: Response, next: NextFunction) => {
  // Get JWT token from head
  const authorization = req.headers['authorization'];

  // Check if the authorization header was provided
  if (!authorization) {
    res.status(401).send();
    throw new Error("Not authenticated");
  }

  // Validate
  try {
    // Get token from header (Bearer XXXXXXXXX)
    const token = authorization.split(" ")[1];
    // Get the token data
    const tokenData = verify(token, process.env.JWT_SECRET!) as AccessToken;
    // Pass the userId to the next middleware
    res.locals.userId = tokenData.userId;
    next();
  } catch (error) {
    // Unauthorised
    res.status(401).send();
    throw new Error("Not authenticated");
  }
}