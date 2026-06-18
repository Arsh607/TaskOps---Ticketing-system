interface TicketUpdate {
  id: number;
  message: string;
}

export function validateUpdateMessage(message: string): string | null {
  if (message.trim() === "") {
    return "Update message cannot be empty.";
  }

  return null;
}

export function createTicketUpdate(message: string): TicketUpdate {
  return {
    id: Date.now(),
    message: message.trim(),
  };
}

export function removeTicketUpdate(
  updates: TicketUpdate[],
  updateId: number
): TicketUpdate[] {
  return updates.filter((update) => update.id !== updateId);
}