import { prisma } from '../lib/prisma.js';
import type {
  CreateKanbanTaskInput,
  UpdateKanbanTaskInput,
} from '../schemas/kanbanTaskSchemas.js';

const kanbanTaskSelect = {
  id: true,
  title: true,
  priority: true,
  columnId: true,
} as const;

const kanbanColumnSelect = {
  id: true,
  title: true,
  description: true,
} as const;

export const kanbanTaskService = {
  listColumns() {
    return prisma.kanbanColumn.findMany({
      select: kanbanColumnSelect,
      orderBy: { id: 'asc' },
    });
  },

  listTasks() {
    return prisma.kanbanTask.findMany({
      select: kanbanTaskSelect,
      orderBy: { id: 'asc' },
    });
  },

  createTask(task: CreateKanbanTaskInput) {
    return prisma.kanbanTask.create({
      data: task,
      select: kanbanTaskSelect,
    });
  },

  async updateTask(taskId: number, updates: UpdateKanbanTaskInput) {
    const existingTask = await prisma.kanbanTask.findUnique({
      where: { id: taskId },
      select: { id: true },
    });

    if (!existingTask) {
      return null;
    }

    return prisma.kanbanTask.update({
      where: { id: taskId },
      data: updates,
      select: kanbanTaskSelect,
    });
  },

  async deleteTask(taskId: number) {
    const result = await prisma.kanbanTask.deleteMany({
      where: { id: taskId },
    });

    return result.count > 0;
  },
};
