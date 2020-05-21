import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AccessToken, createAccessToken } from '../utils/auth';
import Account from 'data/models/Account';

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
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
    const tokenData = verify(token, process.env.JWT_SECRET) as AccessToken;
    // Get the account from the verified token
    const account = await Account.query().findById(tokenData.userId);
    // Create the access token
    res.setHeader("token", createAccessToken(account));
    // Pass the account to the next middleware
    res.locals.account = account;
    next();
  } catch (error) {
    // Unauthorised
    res.status(401).send();
    throw new Error("Not authenticated");
  }
  // Respond with a new token
  
}