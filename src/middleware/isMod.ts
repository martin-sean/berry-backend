import { Request, Response, NextFunction } from 'express';

// Check if account is a moderator and can access the protected function
export default async (req: Request, res: Response, next: NextFunction) => {
  // Get if moderator from previous (isAuth) middleware
  const isMod: boolean = res.locals.isMod;
  return isMod ? next() : res.status(401).send();
}