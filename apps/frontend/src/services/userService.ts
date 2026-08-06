import {
  syncCurrentUser as syncCurrentUserInRepository,
  type CurrentAppUser,
} from '../repositories/userRepository';

export const userService = {
  syncCurrentUser(sessionToken: string): Promise<CurrentAppUser> {
    return syncCurrentUserInRepository(sessionToken);
  },
};
