import {
  createKanbanTask,
  deleteKanbanTask,
  getAllKanbanColumns,
  getAllKanbanTasks,
  updateKanbanTaskColumn,
} from '../repositories/kanbanTaskRepository'
import type {
  DraftKanbanTask,
  KanbanColumn,
  KanbanTask,
  KanbanTaskColumnId,
} from '../types/KanbanTask'

export interface KanbanColumnWithTasks extends KanbanColumn {
  tasks: KanbanTask[]
}

export function getDefaultDraftKanbanTask(): DraftKanbanTask {
  return {
    title: '',
    priority: 'Medium',
    columnId: 1,
  }
}

export function validateDraftKanbanTask(draftTask: DraftKanbanTask): string {
  const trimmedTitle = draftTask.title.trim()

  if (trimmedTitle.length === 0) {
    return 'Task title is required.'
  }

  if (trimmedTitle.length < 3) {
    return 'Task title must be at least 3 characters.'
  }

  if (trimmedTitle.length > 120) {
    return 'Task title must be 120 characters or fewer.'
  }

  return ''
}

export async function loadKanbanBoard(): Promise<{
  columns: KanbanColumn[]
  tasks: KanbanTask[]
}> {
  const [columns, tasks] = await Promise.all([
    getAllKanbanColumns(),
    getAllKanbanTasks(),
  ])

  return { columns, tasks }
}

export function groupKanbanTasks(
  columns: KanbanColumn[],
  tasks: KanbanTask[],
): KanbanColumnWithTasks[] {
  return columns.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.columnId === column.id),
  }))
}

export function addKanbanTask(
  draftTask: DraftKanbanTask,
): Promise<KanbanTask> {
  return createKanbanTask({
    ...draftTask,
    title: draftTask.title.trim(),
  })
}

export function moveKanbanTask(
  taskId: KanbanTask['id'],
  columnId: KanbanTaskColumnId,
): Promise<KanbanTask> {
  return updateKanbanTaskColumn(taskId, columnId)
}

export function removeKanbanTask(taskId: KanbanTask['id']): Promise<void> {
  return deleteKanbanTask(taskId)
}
