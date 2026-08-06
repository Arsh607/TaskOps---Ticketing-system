import type { GetToken } from "../lib/authenticatedFetch";

import {
  createTicketUpdate as createTicketUpdateInRepository,
  deleteTicketUpdate as deleteTicketUpdateInRepository,
  getMyTicketUpdates as getMyTicketUpdatesFromRepository,
  getTicketUpdates as getTicketUpdatesFromRepository,
  updateTicketUpdate as updateTicketUpdateInRepository,
  type CreateTicketUpdateInput,
  type TicketUpdate,
} from "../repositories/ticketUpdateRepository";

export function validateUpdateMessage(
  message: string,
): string | null {
  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return "Update message cannot be empty.";
  }

  if (trimmedMessage.length < 5) {
    return "Update message must be at least 5 characters.";
  }

  if (trimmedMessage.length > 1000) {
    return "Update message cannot exceed 1000 characters.";
  }

  return null;
}

function sortNewestFirst(
  updates: TicketUpdate[],
): TicketUpdate[] {
  return [...updates].sort(
    (firstUpdate, secondUpdate) =>
      new Date(secondUpdate.createdAt).getTime() -
      new Date(firstUpdate.createdAt).getTime(),
  );
}

export async function getSortedUpdatesForTicket(
  ticketId: number,
  getToken: GetToken,
): Promise<TicketUpdate[]> {
  const updates =
    await getTicketUpdatesFromRepository(
      ticketId,
      getToken,
    );

  return sortNewestFirst(updates);
}

export async function getSortedUpdatesForCurrentUser(
  getToken: GetToken,
): Promise<TicketUpdate[]> {
  const updates =
    await getMyTicketUpdatesFromRepository(getToken);

  return sortNewestFirst(updates);
}

export async function addTicketUpdate(
  ticketId: number,
  message: string,
  createdBy: string,
  getToken: GetToken,
): Promise<TicketUpdate> {
  const error = validateUpdateMessage(message);

  if (error) {
    throw new Error(error);
  }

  const input: CreateTicketUpdateInput = {
    ticketId,
    message: message.trim(),
    createdBy: createdBy.trim(),
  };

  return createTicketUpdateInRepository(input, getToken);
}

export async function editTicketUpdate(
  updateId: number,
  message: string,
  getToken: GetToken,
): Promise<TicketUpdate> {
  const error = validateUpdateMessage(message);

  if (error) {
    throw new Error(error);
  }

  return updateTicketUpdateInRepository(
    updateId,
    message.trim(),
    getToken,
  );
}

export async function removeTicketUpdate(
  updateId: number,
  getToken: GetToken,
): Promise<void> {
  await deleteTicketUpdateInRepository(
    updateId,
    getToken,
  );
}