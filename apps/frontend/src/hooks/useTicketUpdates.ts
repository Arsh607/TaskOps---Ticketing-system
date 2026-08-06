import { useAuth } from "@clerk/react";
import { useCallback, useEffect, useState } from "react";
import type { TicketUpdate } from "../repositories/ticketUpdateRepository";
import {
  addTicketUpdate,
  getSortedUpdatesForTicket,
  removeTicketUpdate,
  validateUpdateMessage,
} from "../services/ticketUpdateService";

export function useTicketUpdates(ticketId: number | null) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [updates, setUpdates] = useState<TicketUpdate[]>([]);
  const [newUpdate, setNewUpdate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const refreshUpdates = useCallback(async () => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    if (ticketId === null) {
      setUpdates([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const loadedUpdates = await getSortedUpdatesForTicket(ticketId, getToken);
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
  }, [getToken, isLoaded, isSignedIn, ticketId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void refreshUpdates();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [refreshUpdates]);

  async function handleAddUpdate(createdBy: string) {
    if (ticketId === null) {
      setErrorMessage("Create a ticket first before adding updates.");
      return;
    }

    const validationError = validateUpdateMessage(newUpdate);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setErrorMessage("");

      await addTicketUpdate(ticketId, newUpdate, createdBy, getToken);

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

      await removeTicketUpdate(updateId, getToken);
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
