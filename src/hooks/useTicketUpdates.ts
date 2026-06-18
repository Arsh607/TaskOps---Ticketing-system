import { useState } from "react";
import type { TicketUpdate } from "../types/TicketUpdate";
import {
  addTicketUpdate,
  getSortedUpdatesForTicket,
  removeTicketUpdate,
  validateUpdateMessage,
} from "../services/ticketUpdateService";

export function useTicketUpdates(ticketId: string) {
  const [updates, setUpdates] = useState<TicketUpdate[]>(
    getSortedUpdatesForTicket(ticketId)
  );

  const [newUpdate, setNewUpdate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function refreshUpdates() {
    setUpdates(getSortedUpdatesForTicket(ticketId));
  }

  function handleAddUpdate(createdBy: string) {
    const error = validateUpdateMessage(newUpdate);

    if (error) {
      setErrorMessage(error);
      return;
    }

    addTicketUpdate(ticketId, newUpdate, createdBy);
    setNewUpdate("");
    setErrorMessage("");
    refreshUpdates();
  }

  function handleRemoveUpdate(updateId: number) {
    removeTicketUpdate(updateId);
    refreshUpdates();
  }

  return {
    updates,
    newUpdate,
    setNewUpdate,
    errorMessage,
    handleAddUpdate,
    handleRemoveUpdate,
    refreshUpdates,
  };
}