import { useCallback, useEffect, useState } from "react";
import type { TicketUpdate } from "../repositories/ticketUpdateRepository";
import {
  addTicketUpdate,
  getSortedUpdatesForTicket,
  removeTicketUpdate,
  validateUpdateMessage,
} from "../services/ticketUpdateService";

export function useTicketUpdates(ticketId: number) {
  const [updates, setUpdates] = useState<TicketUpdate[]>([]);
  const [newUpdate, setNewUpdate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const refreshUpdates = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const loadedUpdates = await getSortedUpdatesForTicket(ticketId);
      setUpdates(loadedUpdates);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load ticket updates.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    void refreshUpdates();
  }, [refreshUpdates]);

  async function handleAddUpdate(
    createdBy: string,
    sessionToken?: string,
  ) {
    const validationError = validateUpdateMessage(newUpdate);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setErrorMessage("");

      await addTicketUpdate(
        ticketId,
        newUpdate,
        createdBy,
        sessionToken,
      );

      setNewUpdate("");
      await refreshUpdates();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to add the ticket update.",
      );
    }
  }

  async function handleRemoveUpdate(updateId: number) {
    try {
      setErrorMessage("");

      await removeTicketUpdate(updateId);
      await refreshUpdates();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to remove the ticket update.",
      );
    }
  }

  return {
    updates,
    newUpdate,
    setNewUpdate,
    errorMessage,
    isLoading,
    handleAddUpdate,
    handleRemoveUpdate,
    refreshUpdates,
  };
}