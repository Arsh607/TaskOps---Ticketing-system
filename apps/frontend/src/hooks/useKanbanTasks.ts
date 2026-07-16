import { useEffect, useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import {
  addKanbanTask,
  getDefaultDraftKanbanTask,
  groupKanbanTasks,
  loadKanbanBoard,
  moveKanbanTask,
  type KanbanColumnWithTasks,
  removeKanbanTask,
  validateDraftKanbanTask,
} from '../services/kanbanTaskService'
import type {
  DraftKanbanTask,
  KanbanColumn,
  KanbanTask,
  KanbanTaskColumnId,
} from '../types/KanbanTask'

interface UseKanbanTasksResult {
  columns: KanbanColumnWithTasks[]
  draftTask: DraftKanbanTask
  validationError: string
  requestError: string
  isLoading: boolean
  isSaving: boolean
  setDraftTask: Dispatch<SetStateAction<DraftKanbanTask>>
  addTask: () => Promise<void>
  moveTask: (
    taskId: KanbanTask['id'],
    columnId: KanbanTaskColumnId,
  ) => Promise<void>
  removeTask: (taskId: KanbanTask['id']) => Promise<void>
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'Unable to communicate with the Kanban service.'
}

export function useKanbanTasks(): UseKanbanTasksResult {
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn[]>([])
  const [tasks, setTasks] = useState<KanbanTask[]>([])
  const [draftTask, setDraftTask] = useState<DraftKanbanTask>(
    getDefaultDraftKanbanTask,
  )
  const [validationError, setValidationError] = useState('')
  const [requestError, setRequestError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const columns = useMemo(
    () => groupKanbanTasks(kanbanColumns, tasks),
    [kanbanColumns, tasks],
  )

  useEffect(() => {
    let ignoreResult = false

    async function loadTasks(): Promise<void> {
      try {
        const board = await loadKanbanBoard()

        if (!ignoreResult) {
          setKanbanColumns(board.columns)
          setTasks(board.tasks)
          setRequestError('')
        }
      } catch (error) {
        if (!ignoreResult) {
          setRequestError(getErrorMessage(error))
        }
      } finally {
        if (!ignoreResult) {
          setIsLoading(false)
        }
      }
    }

    void loadTasks()

    return () => {
      ignoreResult = true
    }
  }, [])

  async function addTask(): Promise<void> {
    const validationMessage = validateDraftKanbanTask(draftTask)

    if (validationMessage !== '') {
      setValidationError(validationMessage)
      return
    }

    setIsSaving(true)
    try {
      const task = await addKanbanTask(draftTask)
      setTasks((currentTasks) => [...currentTasks, task])
      setValidationError('')
      setRequestError('')
      setDraftTask({
        ...getDefaultDraftKanbanTask(),
        columnId: draftTask.columnId,
      })
    } catch (error) {
      setRequestError(getErrorMessage(error))
    } finally {
      setIsSaving(false)
    }
  }

  async function moveTask(
    taskId: KanbanTask['id'],
    columnId: KanbanTaskColumnId,
  ): Promise<void> {
    setIsSaving(true)
    try {
      const updatedTask = await moveKanbanTask(taskId, columnId)
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      )
      setRequestError('')
    } catch (error) {
      setRequestError(getErrorMessage(error))
    } finally {
      setIsSaving(false)
    }
  }

  async function removeTask(taskId: KanbanTask['id']): Promise<void> {
    setIsSaving(true)
    try {
      await removeKanbanTask(taskId)
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      )
      setRequestError('')
    } catch (error) {
      setRequestError(getErrorMessage(error))
    } finally {
      setIsSaving(false)
    }
  }

  return {
    columns,
    draftTask,
    validationError,
    requestError,
    isLoading,
    isSaving,
    setDraftTask,
    addTask,
    moveTask,
    removeTask,
  }
}
