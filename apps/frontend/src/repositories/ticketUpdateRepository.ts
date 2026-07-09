import { ticketUpdatesTestData } from "../data/ticketUpdatesTestData";
import type { TicketUpdate } from "../types/TicketUpdate";

let ticketUpdates: TicketUpdate[] = [...ticketUpdatesTestData];

export function getAllTicketUpdates(): TicketUpdate[] {
  return ticketUpdates;
}

export function getTicketUpdatesByTicketId(ticketId: string): TicketUpdate[] {
  return ticketUpdates.filter((update) => update.ticketId === ticketId);
}

export function createTicketUpdate(update: TicketUpdate): TicketUpdate {
  ticketUpdates = [...ticketUpdates, update];
  return update;
}

export function updateTicketUpdate(
  updateId: number,
  updatedMessage: string
): TicketUpdate | null {
  const existingUpdate = ticketUpdates.find((update) => update.id === updateId);

  if (!existingUpdate) {
    return null;
  }

  const updatedTicketUpdate: TicketUpdate = {
    ...existingUpdate,
    message: updatedMessage,
  };

  ticketUpdates = ticketUpdates.map((update) =>
    update.id === updateId ? updatedTicketUpdate : update
  );

  return updatedTicketUpdate;
}

export function deleteTicketUpdate(updateId: number): void {
  ticketUpdates = ticketUpdates.filter((update) => update.id !== updateId);
}