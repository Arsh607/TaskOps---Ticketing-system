import type {
  DraftKanbanTask,
  KanbanColumn,
  KanbanTask,
  KanbanTaskColumnId,
} from '../types/KanbanTask'
import {
  authenticatedFetch,
  type GetToken,
} from '../lib/authenticatedFetch'

const apiRootUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'
const apiBaseUrl = `${apiRootUrl}/api`

async function requestJson<T>(
  path: string,
  getToken: GetToken,
  init?: RequestInit,
): Promise<T> {
  const response = await authenticatedFetch(`${apiBaseUrl}${path}`, getToken, {
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

export function getAllKanbanColumns(getToken: GetToken): Promise<KanbanColumn[]> {
  return requestJson<KanbanColumn[]>('/kanban-columns', getToken)
}

export function getAllKanbanTasks(getToken: GetToken): Promise<KanbanTask[]> {
  return requestJson<KanbanTask[]>('/kanban-tasks', getToken)
}

export function createKanbanTask(
  task: DraftKanbanTask,
  getToken: GetToken,
): Promise<KanbanTask> {
  return requestJson<KanbanTask>('/kanban-tasks', getToken, {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

export function updateKanbanTaskColumn(
  taskId: KanbanTask['id'],
  columnId: KanbanTaskColumnId,
  getToken: GetToken,
): Promise<KanbanTask> {
  return requestJson<KanbanTask>(`/kanban-tasks/${taskId}`, getToken, {
    method: 'PATCH',
    body: JSON.stringify({ columnId }),
  })
}

export async function deleteKanbanTask(
  taskId: KanbanTask['id'],
  getToken: GetToken,
): Promise<void> {
  const response = await authenticatedFetch(
    `${apiBaseUrl}/kanban-tasks/${taskId}`,
    getToken,
    { method: 'DELETE' },
  )

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(result?.error ?? `Request failed with status ${response.status}.`)
  }
}
