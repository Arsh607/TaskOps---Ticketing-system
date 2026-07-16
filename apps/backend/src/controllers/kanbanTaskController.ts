import type { Request, Response } from 'express';
import type {
  CreateKanbanTaskInput,
  UpdateKanbanTaskInput,
} from '../schemas/kanbanTaskSchemas.js';
import { kanbanTaskService } from '../services/kanbanTaskService.js';

export const kanbanTaskController = {
  async listColumns(_request: Request, response: Response): Promise<void> {
    const columns = await kanbanTaskService.listColumns();
    response.status(200).json(columns);
  },

  async listTasks(_request: Request, response: Response): Promise<void> {
    const tasks = await kanbanTaskService.listTasks();
    response.status(200).json(tasks);
  },

  async createTask(request: Request, response: Response): Promise<void> {
    const task = await kanbanTaskService.createTask(
      request.body as CreateKanbanTaskInput,
    );
    response.status(201).json(task);
  },

  async updateTask(request: Request, response: Response): Promise<void> {
    const taskId = Number(request.params.taskId);
    const task = await kanbanTaskService.updateTask(
      taskId,
      request.body as UpdateKanbanTaskInput,
    );

    if (!task) {
      response.status(404).json({ error: 'Kanban task not found.' });
      return;
    }

    response.status(200).json(task);
  },

  async deleteTask(request: Request, response: Response): Promise<void> {
    const taskId = Number(request.params.taskId);
    const wasDeleted = await kanbanTaskService.deleteTask(taskId);

    if (!wasDeleted) {
      response.status(404).json({ error: 'Kanban task not found.' });
      return;
    }

    response.status(204).send();
  },
};
