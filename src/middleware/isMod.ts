import { Request, Response, NextFunction } from 'express';
import Account from '../data/models/Account';

// Check if account is a moderator and can access the protected function
export default (mod: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Get the user id
    const account = res.locals.account as Account;

    // Check if account exists and is a moderator
    if (account && account.moderator) {
      next();
    } else {
      res.status(401).send();
    }
  }
}