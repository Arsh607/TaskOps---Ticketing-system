import { z } from 'zod';

export const kanbanTaskPrioritySchema = z.enum(['High', 'Medium', 'Low']);
export const kanbanColumnIdSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);

export const listKanbanResourcesQuerySchema = z.object({}).strict();

export const kanbanTaskIdParamsSchema = z
  .object({
    taskId: z.coerce.number().int().positive(),
  })
  .strict();

export const createKanbanTaskBodySchema = z
  .object({
    title: z.string().trim().min(3).max(120),
    priority: kanbanTaskPrioritySchema,
    columnId: kanbanColumnIdSchema,
  })
  .strict();

export const updateKanbanTaskBodySchema = createKanbanTaskBodySchema
  .partial()
  .refine((updates) => Object.keys(updates).length > 0, {
    message: 'At least one task field must be provided.',
  });

export type CreateKanbanTaskInput = z.infer<
  typeof createKanbanTaskBodySchema
>;
export type UpdateKanbanTaskInput = z.infer<
  typeof updateKanbanTaskBodySchema
>;
