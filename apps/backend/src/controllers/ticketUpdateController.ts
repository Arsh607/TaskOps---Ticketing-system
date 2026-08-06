import type { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import {
  createTicketUpdate,
  deleteTicketUpdate,
  getUserScopedUpdatesByTicketId,
  updateTicketUpdate,
} from "../services/ticketUpdateService.js";

export async function getTicketUpdatesController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      response.status(401).json({ error: "Unauthorized." });
      return;
    }

    const ticketId = Number(request.params.ticketId);
    const updates = await getUserScopedUpdatesByTicketId(ticketId, userId);

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
    const { userId } = getAuth(request);

    if (!userId) {
      response.status(401).json({ error: "Unauthorized." });
      return;
    }

    const createdUpdate = await createTicketUpdate(request.body, userId);

    if (!createdUpdate) {
      response.status(404).json({ error: "Ticket not found." });
      return;
    }

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
    const { userId } = getAuth(request);

    if (!userId) {
      response.status(401).json({ error: "Unauthorized." });
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
        error: "Ticket update not found.",
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
    const { userId } = getAuth(request);

    if (!userId) {
      response.status(401).json({ error: "Unauthorized." });
      return;
    }

    const updateId = Number(request.params.updateId);
    const deletedRecord = await deleteTicketUpdate(updateId, userId);

    if (!deletedRecord) {
      response.status(404).json({
        error: "Ticket update not found.",
      });
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
}