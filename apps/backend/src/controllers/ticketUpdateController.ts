import type { NextFunction, Request, Response } from "express";
import {
  createTicketUpdate,
  deleteTicketUpdate,
  getUpdatesByTicketId,
  updateTicketUpdate,
} from "../services/ticketUpdateService.js";

export async function getTicketUpdatesController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const ticketId = Number(request.params.ticketId);
    const updates = await getUpdatesByTicketId(ticketId);

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
    const createdUpdate = await createTicketUpdate(request.body);

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
    const updateId = Number(request.params.updateId);

    const updatedRecord = await updateTicketUpdate(
      updateId,
      request.body,
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
    const updateId = Number(request.params.updateId);
    const deletedRecord = await deleteTicketUpdate(updateId);

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