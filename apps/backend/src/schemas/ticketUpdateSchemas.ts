import { z } from "zod";

export const ticketIdParamSchema = z
  .object({
    ticketId: z.coerce.number().int().positive(),
  })
  .strict();

export const updateIdParamSchema = z
  .object({
    updateId: z.coerce.number().int().positive(),
  })
  .strict();

export const createTicketUpdateBodySchema = z
  .object({
    ticketId: z.number().int().positive(),

    message: z
      .string()
      .trim()
      .min(5, "Update message must be at least 5 characters.")
      .max(1000, "Update message cannot exceed 1000 characters."),

    createdBy: z
      .string()
      .trim()
      .min(2, "Created-by name must be at least 2 characters.")
      .max(100, "Created-by name cannot exceed 100 characters."),
  })
  .strict();

export const updateTicketUpdateBodySchema = z
  .object({
    message: z
      .string()
      .trim()
      .min(5, "Update message must be at least 5 characters.")
      .max(1000, "Update message cannot exceed 1000 characters."),
  })
  .strict();

export type CreateTicketUpdateInput = z.infer<
  typeof createTicketUpdateBodySchema
>;

export type UpdateTicketUpdateInput = z.infer<
  typeof updateTicketUpdateBodySchema
>;