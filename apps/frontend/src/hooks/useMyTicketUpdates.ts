import { useAuth } from "@clerk/react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type { TicketUpdate } from "../repositories/ticketUpdateRepository";

import { getSortedUpdatesForCurrentUser } from "../services/ticketUpdateService";

export function useMyTicketUpdates() {
  const {
    getToken,
    isLoaded,
    isSignedIn,
  } = useAuth();

  const [updates, setUpdates] =
    useState<TicketUpdate[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const refreshMyUpdates = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      setUpdates([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const loadedUpdates =
        await getSortedUpdatesForCurrentUser(getToken);

      setUpdates(loadedUpdates);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load your ticket updates.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [getToken, isLoaded, isSignedIn]);

  useEffect(() => {
    void refreshMyUpdates();
  }, [refreshMyUpdates]);

  return {
    updates,
    isLoading,
    errorMessage,
    isLoaded,
    isSignedIn,
    refreshMyUpdates,
  };
}