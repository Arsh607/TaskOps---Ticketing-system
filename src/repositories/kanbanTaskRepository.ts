import { kanbanTaskTestData } from '../data/kanbanTaskTestData'
import type { KanbanTask } from '../types/KanbanTask'

type KanbanTaskListener = () => void

let kanbanTasks: KanbanTask[] = [...kanbanTaskTestData]
const listeners = new Set<KanbanTaskListener>()

function notifyKanbanTaskListeners(): void {
  listeners.forEach((listener) => listener())
}

export function getAllKanbanTasks(): KanbanTask[] {
  return [...kanbanTasks]
}

export function getKanbanTaskById(taskId: number): KanbanTask | undefined {
  return kanbanTasks.find((task) => task.id === taskId)
}

export function createKanbanTask(task: KanbanTask): KanbanTask {
  kanbanTasks = [...kanbanTasks, task]
  notifyKanbanTaskListeners()

  return task
}

export function updateKanbanTask(
  updatedTask: KanbanTask,
): KanbanTask | undefined {
  const taskIndex = kanbanTasks.findIndex((task) => task.id === updatedTask.id)

  if (taskIndex === -1) {
    return undefined
  }

  kanbanTasks = kanbanTasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task,
  )
  notifyKanbanTaskListeners()

  return updatedTask
}

export function deleteKanbanTask(taskId: number): void {
  const nextKanbanTasks = kanbanTasks.filter((task) => task.id !== taskId)

  if (nextKanbanTasks.length === kanbanTasks.length) {
    return
  }

  kanbanTasks = nextKanbanTasks
  notifyKanbanTaskListeners()
}

export function subscribeToKanbanTasks(
  listener: KanbanTaskListener,
): () => void {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}
