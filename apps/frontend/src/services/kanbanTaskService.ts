import {
  createKanbanTask,
  deleteKanbanTask,
  getAllKanbanTasks,
  subscribeToKanbanTasks,
  updateKanbanTask,
} from '../repositories/kanbanTaskRepository'
import type {
  DraftKanbanTask,
  KanbanColumn,
  KanbanTask,
  KanbanTaskColumnId,
} from '../types/KanbanTask'

export const kanbanColumns: KanbanColumn[] = [
  {
    id: 1,
    title: 'To Do',
    description: 'Tasks that are ready to start.',
  },
  {
    id: 2,
    title: 'In Progress',
    description: 'Tasks currently being worked on.',
  },
  {
    id: 3,
    title: 'Review',
    description: 'Tasks waiting for review or QA.',
  },
  {
    id: 4,
    title: 'Done',
    description: 'Tasks that have been completed.',
  },
]

export interface KanbanColumnWithTasks extends KanbanColumn {
  tasks: KanbanTask[]
}

let kanbanColumnsWithTasksSnapshot: KanbanColumnWithTasks[] | undefined

function clearKanbanColumnsWithTasksSnapshot(): void {
  kanbanColumnsWithTasksSnapshot = undefined
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

  return ''
}

export function getKanbanColumnsWithTasks(): KanbanColumnWithTasks[] {
  if (kanbanColumnsWithTasksSnapshot !== undefined) {
    return kanbanColumnsWithTasksSnapshot
  }

  const tasks = getAllKanbanTasks()

  kanbanColumnsWithTasksSnapshot = kanbanColumns.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.columnId === column.id),
  }))

  return kanbanColumnsWithTasksSnapshot
}

export function addKanbanTask(draftTask: DraftKanbanTask): KanbanTask {
  const task: KanbanTask = {
    id: Date.now(),
    title: draftTask.title.trim(),
    priority: draftTask.priority,
    columnId: draftTask.columnId,
  }

  return createKanbanTask(task)
}

export function moveKanbanTask(
  task: KanbanTask,
  columnId: KanbanTaskColumnId,
): KanbanTask | undefined {
  return updateKanbanTask({
    ...task,
    columnId,
  })
}

export function removeKanbanTask(taskId: number): void {
  deleteKanbanTask(taskId)
}

export function subscribeToKanbanTaskChanges(listener: () => void): () => void {
  return subscribeToKanbanTasks(() => {
    clearKanbanColumnsWithTasksSnapshot()
    listener()
  })
}
