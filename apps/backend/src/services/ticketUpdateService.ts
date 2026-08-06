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

export const ticketUpdateService = {
  getUpdatesByTicketId(ticketId: number) {
    return prisma.ticketUpdate.findMany({
      where: {
        ticketId,
      },
      select: ticketUpdateSelect,
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getUpdatesByClerkUserId(clerkUserId: string) {
    return prisma.ticketUpdate.findMany({
      where: {
        clerkUserId,
      },
      select: ticketUpdateSelect,
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getTicketUpdateById(updateId: number) {
    return prisma.ticketUpdate.findUnique({
      where: {
        id: updateId,
      },
      select: ticketUpdateSelect,
    });
  },

  async createTicketUpdate(
    input: CreateTicketUpdateInput,
    clerkUserId: string,
  ) {
    // Ensure the authenticated Clerk user exists in the application database.
    await prisma.appUser.upsert({
      where: {
        clerkUserId,
      },
      update: {},
      create: {
        clerkUserId,
      },
    });

    // Create the update and associate it with the authenticated user.
    return prisma.ticketUpdate.create({
      data: {
        ticketId: input.ticketId,
        message: input.message,
        createdBy: input.createdBy,
        clerkUserId,
      },
      select: ticketUpdateSelect,
    });
  },

  async updateTicketUpdate(
    updateId: number,
    input: UpdateTicketUpdateInput,
    clerkUserId: string,
  ) {
    const existingUpdate = await prisma.ticketUpdate.findFirst({
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
  },

  async deleteTicketUpdate(
    updateId: number,
    clerkUserId: string,
  ) {
    const existingUpdate = await prisma.ticketUpdate.findFirst({
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
  },
};