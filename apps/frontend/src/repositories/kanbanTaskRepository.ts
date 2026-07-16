import type {
  DraftKanbanTask,
  KanbanColumn,
  KanbanTask,
  KanbanTaskColumnId,
} from '../types/KanbanTask'

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: init?.body
      ? { 'Content-Type': 'application/json', ...init.headers }
      : init?.headers,
  })

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(result?.error ?? `Request failed with status ${response.status}.`)
  }

  return response.json() as Promise<T>
}

export function getAllKanbanColumns(): Promise<KanbanColumn[]> {
  return requestJson<KanbanColumn[]>('/kanban-columns')
}

export function getAllKanbanTasks(): Promise<KanbanTask[]> {
  return requestJson<KanbanTask[]>('/kanban-tasks')
}

export function createKanbanTask(task: DraftKanbanTask): Promise<KanbanTask> {
  return requestJson<KanbanTask>('/kanban-tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

export function updateKanbanTaskColumn(
  taskId: KanbanTask['id'],
  columnId: KanbanTaskColumnId,
): Promise<KanbanTask> {
  return requestJson<KanbanTask>(`/kanban-tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ columnId }),
  })
}

export async function deleteKanbanTask(
  taskId: KanbanTask['id'],
): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/kanban-tasks/${taskId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(result?.error ?? `Request failed with status ${response.status}.`)
  }
}
