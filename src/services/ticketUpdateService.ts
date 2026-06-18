import type { TicketUpdate } from "../types/TicketUpdate";
import {
  createTicketUpdate as createTicketUpdateInRepository,
  deleteTicketUpdate,
  getTicketUpdatesByTicketId,
} from "../repositories/ticketUpdateRepository";

export function validateUpdateMessage(message: string): string | null {
  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return "Update message cannot be empty.";
  }

  if (trimmedMessage.length < 5) {
    return "Update message must be at least 5 characters.";
  }

  return null;
}

export function getSortedUpdatesForTicket(ticketId: string): TicketUpdate[] {
  const updates = getTicketUpdatesByTicketId(ticketId);

  return [...updates].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addTicketUpdate(
  ticketId: string,
  message: string,
  createdBy: string
): TicketUpdate {
  const newUpdate: TicketUpdate = {
    id: Date.now(),
    ticketId,
    message: message.trim(),
    createdBy,
    createdAt: new Date().toISOString(),
  };

  return createTicketUpdateInRepository(newUpdate);
}

export function removeTicketUpdate(updateId: number): void {
  deleteTicketUpdate(updateId);
}