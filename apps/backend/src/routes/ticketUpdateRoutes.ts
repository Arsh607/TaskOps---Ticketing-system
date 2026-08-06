import { Router } from "express";

import {
  createTicketUpdateController,
  deleteTicketUpdateController,
  getMyTicketUpdatesController,
  getTicketUpdatesController,
  updateTicketUpdateController,
} from "../controllers/ticketUpdateController.js";

import { validateRequest } from "../middleware/validateRequest.js";

import {
  createTicketUpdateBodySchema,
  ticketIdParamSchema,
  updateIdParamSchema,
  updateTicketUpdateBodySchema,
} from "../schemas/ticketUpdateSchemas.js";

const ticketUpdateRouter = Router();

ticketUpdateRouter.get(
  "/tickets/:ticketId/updates",
  validateRequest({
    params: ticketIdParamSchema,
  }),
  getTicketUpdatesController,
);

// Returns only updates associated with the authenticated Clerk user.
ticketUpdateRouter.get(
  "/my-ticket-updates",
  getMyTicketUpdatesController,
);

ticketUpdateRouter.post(
  "/ticket-updates",
  validateRequest({
    body: createTicketUpdateBodySchema,
  }),
  createTicketUpdateController,
);

ticketUpdateRouter.patch(
  "/ticket-updates/:updateId",
  validateRequest({
    params: updateIdParamSchema,
    body: updateTicketUpdateBodySchema,
  }),
  updateTicketUpdateController,
);

ticketUpdateRouter.delete(
  "/ticket-updates/:updateId",
  validateRequest({
    params: updateIdParamSchema,
  }),
  deleteTicketUpdateController,
);

export default ticketUpdateRouter;