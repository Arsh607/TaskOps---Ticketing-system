import { getAuth } from '@clerk/express';
import type { Request, Response } from 'express';
import { appUserService } from '../services/appUserService.js';

export async function upsertCurrentUser(request: Request, response: Response) {
  const { userId } = getAuth(request);

  if (!userId) {
    response.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const appUser = await appUserService.upsertByClerkUserId(userId);
  response.status(200).json(appUser);
}
