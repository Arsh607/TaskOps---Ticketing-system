import { getAuth } from '@clerk/express';
import type { NextFunction, Request, Response } from 'express';

export function requireAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { isAuthenticated } = getAuth(request);

  if (!isAuthenticated) {
    response.status(401).json({ error: 'Authentication required.' });
    return;
  }

  next();
}
