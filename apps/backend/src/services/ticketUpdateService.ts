import { prisma } from "../lib/prisma.js";
import { appUserService } from "./appUserService.js";
import type {
  CreateTicketUpdateInput,
  UpdateTicketUpdateInput,
} from "../schemas/ticketUpdateSchemas.js";

export async function getUpdatesByTicketId(ticketId: number) {
  return prisma.ticketUpdate.findMany({
    where: { ticketId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserScopedUpdatesByTicketId(
  ticketId: number,
  clerkUserId: string,
) {
  const appUser = await appUserService.findByClerkUserId(clerkUserId);

  if (!appUser) {
    return [];
  }

  return prisma.ticketUpdate.findMany({
    where: {
      ticketId,
      appUserId: appUser.id,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTicketUpdateById(updateId: number) {
  return prisma.ticketUpdate.findUnique({
    where: { id: updateId },
  });
}

export async function createTicketUpdate(
  input: CreateTicketUpdateInput,
  clerkUserId: string,
) {
  const existingTicket = await prisma.ticket.findUnique({
    where: { id: input.ticketId },
    select: { id: true },
  });

  if (!existingTicket) {
    return null;
  }

  const appUser = await appUserService.upsertByClerkUserId(clerkUserId);

  return prisma.ticketUpdate.create({
    data: {
      ticketId: input.ticketId,
      message: input.message,
      createdBy: input.createdBy,
      appUserId: appUser.id,
    },
  });
}

export async function updateTicketUpdate(
  updateId: number,
  input: UpdateTicketUpdateInput,
  clerkUserId: string,
) {
  const appUser = await appUserService.findByClerkUserId(clerkUserId);

  if (!appUser) {
    return null;
  }

  const existingUpdate = await prisma.ticketUpdate.findFirst({
    where: {
      id: updateId,
      appUserId: appUser.id,
    },
    select: { id: true },
  });

  if (!existingUpdate) {
    return null;
  }

  return prisma.ticketUpdate.update({
    where: { id: updateId },
    data: {
      message: input.message,
    },
  });
}

export async function deleteTicketUpdate(
  updateId: number,
  clerkUserId: string,
) {
  const appUser = await appUserService.findByClerkUserId(clerkUserId);

  if (!appUser) {
    return null;
  }

  const existingUpdate = await prisma.ticketUpdate.findFirst({
    where: {
      id: updateId,
      appUserId: appUser.id,
    },
    select: { id: true },
  });

  if (!existingUpdate) {
    return null;
  }

  return prisma.ticketUpdate.delete({
    where: { id: updateId },
  });
}