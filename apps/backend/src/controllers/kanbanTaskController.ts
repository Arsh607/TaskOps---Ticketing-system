import { getAuth } from '@clerk/express';
import type { Request, Response } from 'express';
import type {
  CreateKanbanTaskInput,
  UpdateKanbanTaskInput,
} from '../schemas/kanbanTaskSchemas.js';
import { kanbanTaskService } from '../services/kanbanTaskService.js';

function getAuthenticatedUserId(
  request: Request,
  response: Response,
): string | null {
  const { userId } = getAuth(request);

  if (!userId) {
    response.status(401).json({ error: 'Authentication required.' });
    return null;
  }

  return userId;
}

export const kanbanTaskController = {
  async listColumns(_request: Request, response: Response): Promise<void> {
    const columns = await kanbanTaskService.listColumns();
    response.status(200).json(columns);
  },

  async listTasks(request: Request, response: Response): Promise<void> {
    const clerkUserId = getAuthenticatedUserId(request, response);

    if (!clerkUserId) return;

    const tasks = await kanbanTaskService.listTasks(clerkUserId);
    response.status(200).json(tasks);
  },

  async createTask(request: Request, response: Response): Promise<void> {
    const clerkUserId = getAuthenticatedUserId(request, response);

    if (!clerkUserId) return;

    const task = await kanbanTaskService.createTask(
      request.body as CreateKanbanTaskInput,
      clerkUserId,
    );
    response.status(201).json(task);
  },

  async updateTask(request: Request, response: Response): Promise<void> {
    const clerkUserId = getAuthenticatedUserId(request, response);

    if (!clerkUserId) return;

    const taskId = Number(request.params.taskId);
    const task = await kanbanTaskService.updateTask(
      taskId,
      request.body as UpdateKanbanTaskInput,
      clerkUserId,
    );

    if (!task) {
      response.status(404).json({ error: 'Kanban task not found.' });
      return;
    }

    response.status(200).json(task);
  },

  async deleteTask(request: Request, response: Response): Promise<void> {
    const clerkUserId = getAuthenticatedUserId(request, response);

    if (!clerkUserId) return;

    const taskId = Number(request.params.taskId);
    const wasDeleted = await kanbanTaskService.deleteTask(taskId, clerkUserId);

    if (!wasDeleted) {
      response.status(404).json({ error: 'Kanban task not found.' });
      return;
    }

    response.status(204).send();
  },
};
