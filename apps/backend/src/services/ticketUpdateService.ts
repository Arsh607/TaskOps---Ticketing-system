import { prisma } from "../lib/prisma.js";
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

export async function getTicketUpdateById(updateId: number) {
  return prisma.ticketUpdate.findUnique({
    where: { id: updateId },
  });
}

export async function createTicketUpdate(input: CreateTicketUpdateInput) {
  return prisma.ticketUpdate.create({
    data: {
      ticketId: input.ticketId,
      message: input.message,
      createdBy: input.createdBy,
    },
  });
}

export async function updateTicketUpdate(
  updateId: number,
  input: UpdateTicketUpdateInput,
) {
  const existingUpdate = await getTicketUpdateById(updateId);

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

export async function deleteTicketUpdate(updateId: number) {
  const existingUpdate = await getTicketUpdateById(updateId);

  if (!existingUpdate) {
    return null;
  }

  return prisma.ticketUpdate.delete({
    where: { id: updateId },
  });
}