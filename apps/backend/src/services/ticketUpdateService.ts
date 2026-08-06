import { prisma } from "../lib/prisma.js";

import type {
  CreateTicketUpdateInput,
  UpdateTicketUpdateInput,
} from "../schemas/ticketUpdateSchemas.js";

const ticketUpdateSelect = {
  id: true,
  ticketId: true,
  message: true,
  createdBy: true,
  clerkUserId: true,
  createdAt: true,
  updatedAt: true,
} as const;

/**
 * Returns every update for a ticket that belongs to the
 * currently authenticated Clerk user.
 */
export async function getUserScopedUpdatesByTicketId(
  ticketId: number,
  clerkUserId: string,
) {
  return prisma.ticketUpdate.findMany({
    where: {
      ticketId,
      clerkUserId,
    },
    select: ticketUpdateSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Returns every ticket update created by the authenticated user.
 */
export async function getUpdatesByClerkUserId(
  clerkUserId: string,
) {
  return prisma.ticketUpdate.findMany({
    where: {
      clerkUserId,
    },
    select: ticketUpdateSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Finds one ticket update by its database ID.
 */
export async function getTicketUpdateById(
  updateId: number,
) {
  return prisma.ticketUpdate.findUnique({
    where: {
      id: updateId,
    },
    select: ticketUpdateSelect,
  });
}

/**
 * Creates an AppUser when necessary and associates the new
 * ticket update with the authenticated Clerk user.
 */
export async function createTicketUpdate(
  input: CreateTicketUpdateInput,
  clerkUserId: string,
) {
  await prisma.appUser.upsert({
    where: {
      clerkUserId,
    },
    update: {},
    create: {
      clerkUserId,
    },
  });

  return prisma.ticketUpdate.create({
    data: {
      ticketId: input.ticketId,
      message: input.message,
      createdBy: input.createdBy,
      clerkUserId,
    },
    select: ticketUpdateSelect,
  });
}

/**
 * Updates a ticket update only when it belongs to the
 * authenticated Clerk user.
 */
export async function updateTicketUpdate(
  updateId: number,
  input: UpdateTicketUpdateInput,
  clerkUserId: string,
) {
  const existingUpdate =
    await prisma.ticketUpdate.findFirst({
      where: {
        id: updateId,
        clerkUserId,
      },
      select: {
        id: true,
      },
    });

  if (!existingUpdate) {
    return null;
  }

  return prisma.ticketUpdate.update({
    where: {
      id: updateId,
    },
    data: {
      message: input.message,
    },
    select: ticketUpdateSelect,
  });
}

/**
 * Deletes a ticket update only when it belongs to the
 * authenticated Clerk user.
 */
export async function deleteTicketUpdate(
  updateId: number,
  clerkUserId: string,
) {
  const existingUpdate =
    await prisma.ticketUpdate.findFirst({
      where: {
        id: updateId,
        clerkUserId,
      },
      select: {
        id: true,
      },
    });

  if (!existingUpdate) {
    return false;
  }

  await prisma.ticketUpdate.delete({
    where: {
      id: updateId,
    },
  });

  return true;
}