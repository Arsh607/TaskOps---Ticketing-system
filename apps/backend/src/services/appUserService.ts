import { prisma } from '../lib/prisma.js';

export const appUserService = {
  findByClerkUserId(clerkUserId: string) {
    return prisma.appUser.findUnique({
      where: { clerkUserId },
      select: {
        id: true,
        clerkUserId: true,
      },
    });
  },

  upsertByClerkUserId(clerkUserId: string) {
    return prisma.appUser.upsert({
      where: { clerkUserId },
      update: {},
      create: { clerkUserId },
      select: {
        id: true,
        clerkUserId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
};
