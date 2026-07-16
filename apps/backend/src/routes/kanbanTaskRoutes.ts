import { Router } from 'express';
import { kanbanTaskController } from '../controllers/kanbanTaskController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  createKanbanTaskBodySchema,
  kanbanTaskIdParamsSchema,
  listKanbanResourcesQuerySchema,
  updateKanbanTaskBodySchema,
} from '../schemas/kanbanTaskSchemas.js';

export const kanbanColumnRouter = Router();
export const kanbanTaskRouter = Router();

kanbanColumnRouter.get(
  '/',
  validateRequest({ query: listKanbanResourcesQuerySchema }),
  kanbanTaskController.listColumns,
);

kanbanTaskRouter.get(
  '/',
  validateRequest({ query: listKanbanResourcesQuerySchema }),
  kanbanTaskController.listTasks,
);
kanbanTaskRouter.post(
  '/',
  validateRequest({ body: createKanbanTaskBodySchema }),
  kanbanTaskController.createTask,
);
kanbanTaskRouter.patch(
  '/:taskId',
  validateRequest({
    params: kanbanTaskIdParamsSchema,
    body: updateKanbanTaskBodySchema,
  }),
  kanbanTaskController.updateTask,
);
kanbanTaskRouter.delete(
  '/:taskId',
  validateRequest({ params: kanbanTaskIdParamsSchema }),
  kanbanTaskController.deleteTask,
);
