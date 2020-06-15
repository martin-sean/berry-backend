import { Request, Response, NextFunction } from 'express';
import Account from '../data/models/Account';

// Check if account is a moderator and can access the protected function
export default (mod: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Check if a moderator
    const idMod = res.locals.isMod as boolean;

    // Check if account exists and is a moderator
    if (idMod) {
      next();
    } else {
      // Not authorized
      return res.status(401).send();
    }
  }
}