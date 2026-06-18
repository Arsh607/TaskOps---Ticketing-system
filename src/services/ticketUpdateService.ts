export interface TicketUpdate {
  id: number;
  ticketId: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

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

export function createTicketUpdate(
  ticketId: string,
  message: string,
  createdBy: string
): TicketUpdate {
  return {
    id: Date.now(),
    ticketId,
    message: message.trim(),
    createdBy,
    createdAt: new Date().toISOString(),
  };
}

export function removeTicketUpdate(
  updates: TicketUpdate[],
  updateId: number
): TicketUpdate[] {
  return updates.filter((update) => update.id !== updateId);
}

export function getUpdatesForTicket(
  updates: TicketUpdate[],
  ticketId: string
): TicketUpdate[] {
  return updates.filter((update) => update.ticketId === ticketId);
}

export function sortUpdatesNewestFirst(
  updates: TicketUpdate[]
): TicketUpdate[] {
  return [...updates].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}