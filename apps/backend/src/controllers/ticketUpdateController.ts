import { getAuth } from "@clerk/express";
import type {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  createTicketUpdate,
  deleteTicketUpdate,
  getUpdatesByClerkUserId,
  getUserScopedUpdatesByTicketId,
  updateTicketUpdate,
} from "../services/ticketUpdateService.js";

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
    const userId = getAuthenticatedUserId(request);

    if (!userId) {
      response.status(401).json({
        error: "Authentication required.",
      });
      return;
    }

    const ticketId = Number(request.params.ticketId);

    const updates = await getUserScopedUpdatesByTicketId(
      ticketId,
      userId,
    );

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
    const userId = getAuthenticatedUserId(request);

    if (!userId) {
      response.status(401).json({
        error: "Authentication required.",
      });
      return;
    }

    const updates = await getUpdatesByClerkUserId(userId);

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
    const userId = getAuthenticatedUserId(request);

    if (!userId) {
      response.status(401).json({
        error: "Authentication required.",
      });
      return;
    }

    const createdUpdate = await createTicketUpdate(
      request.body,
      userId,
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
    const userId = getAuthenticatedUserId(request);

    if (!userId) {
      response.status(401).json({
        error: "Authentication required.",
      });
      return;
    }

    const updateId = Number(request.params.updateId);

    const updatedRecord = await updateTicketUpdate(
      updateId,
      request.body,
      userId,
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
    const userId = getAuthenticatedUserId(request);

    if (!userId) {
      response.status(401).json({
        error: "Authentication required.",
      });
      return;
    }

    const updateId = Number(request.params.updateId);

    const deletedRecord = await deleteTicketUpdate(
      updateId,
      userId,
    );

    if (!deletedRecord) {
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