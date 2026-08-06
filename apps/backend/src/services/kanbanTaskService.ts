import { prisma } from '../lib/prisma.js';
import type {
  CreateKanbanTaskInput,
  UpdateKanbanTaskInput,
} from '../schemas/kanbanTaskSchemas.js';
import { appUserService } from './appUserService.js';

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

  listTasks(clerkUserId: string) {
    return prisma.kanbanTask.findMany({
      where: {
        appUser: { clerkUserId },
      },
      select: kanbanTaskSelect,
      orderBy: { id: 'asc' },
    });
  },

  async createTask(task: CreateKanbanTaskInput, clerkUserId: string) {
    const appUser = await appUserService.upsertByClerkUserId(clerkUserId);

    return prisma.kanbanTask.create({
      data: {
        ...task,
        appUserId: appUser.id,
      },
      select: kanbanTaskSelect,
    });
  },

  async updateTask(
    taskId: number,
    updates: UpdateKanbanTaskInput,
    clerkUserId: string,
  ) {
    const existingTask = await prisma.kanbanTask.findFirst({
      where: {
        id: taskId,
        appUser: { clerkUserId },
      },
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

  async deleteTask(taskId: number, clerkUserId: string) {
    const result = await prisma.kanbanTask.deleteMany({
      where: {
        id: taskId,
        appUser: { clerkUserId },
      },
    });

    return result.count > 0;
  },
};
