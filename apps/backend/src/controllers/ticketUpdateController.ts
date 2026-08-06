import { getAuth } from "@clerk/express";
import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { ticketUpdateService } from "../services/ticketUpdateService.js";

function getAuthenticatedUserId(request: Request): string | null {
  const { userId } = getAuth(request);

  return userId ?? null;
}

export async function getTicketUpdatesController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const ticketId = Number(request.params.ticketId);

    const updates =
      await ticketUpdateService.getUpdatesByTicketId(ticketId);

    response.status(200).json(updates);
  } catch (error) {
    next(error);
  }
}

export async function getMyTicketUpdatesController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const clerkUserId = getAuthenticatedUserId(request);

    if (!clerkUserId) {
      response.status(401).json({
        error: "Authentication required.",
      });
      return;
    }

    const updates =
      await ticketUpdateService.getUpdatesByClerkUserId(
        clerkUserId,
      );

    response.status(200).json(updates);
  } catch (error) {
    next(error);
  }
}

export async function createTicketUpdateController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const clerkUserId = getAuthenticatedUserId(request);

    if (!clerkUserId) {
      response.status(401).json({
        error: "Authentication required.",
      });
      return;
    }

    const createdUpdate =
      await ticketUpdateService.createTicketUpdate(
        request.body,
        clerkUserId,
      );

    response.status(201).json(createdUpdate);
  } catch (error) {
    next(error);
  }
}

export async function updateTicketUpdateController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const clerkUserId = getAuthenticatedUserId(request);

    if (!clerkUserId) {
      response.status(401).json({
        error: "Authentication required.",
      });
      return;
    }

    const updateId = Number(request.params.updateId);

    const updatedRecord =
      await ticketUpdateService.updateTicketUpdate(
        updateId,
        request.body,
        clerkUserId,
      );

    if (!updatedRecord) {
      response.status(404).json({
        error:
          "Ticket update was not found or does not belong to this user.",
      });
      return;
    }

    response.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
}

export async function deleteTicketUpdateController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const clerkUserId = getAuthenticatedUserId(request);

    if (!clerkUserId) {
      response.status(401).json({
        error: "Authentication required.",
      });
      return;
    }

    const updateId = Number(request.params.updateId);

    const wasDeleted =
      await ticketUpdateService.deleteTicketUpdate(
        updateId,
        clerkUserId,
      );

    if (!wasDeleted) {
      response.status(404).json({
        error:
          "Ticket update was not found or does not belong to this user.",
      });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
}