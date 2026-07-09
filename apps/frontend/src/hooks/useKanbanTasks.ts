import { useState, useSyncExternalStore } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import {
  addKanbanTask,
  getDefaultDraftKanbanTask,
  getKanbanColumnsWithTasks,
  type KanbanColumnWithTasks,
  removeKanbanTask,
  subscribeToKanbanTaskChanges,
  validateDraftKanbanTask,
} from '../services/kanbanTaskService'
import type { DraftKanbanTask, KanbanTask } from '../types/KanbanTask'

interface UseKanbanTasksResult {
  // Kanban columns grouped with their current tasks.
  columns: KanbanColumnWithTasks[]
  // Form state for the task currently being created.
  draftTask: DraftKanbanTask
  // Current validation message for the draft task form.
  validationError: string
  // Updates draft task form values from UI controls.
  setDraftTask: Dispatch<SetStateAction<DraftKanbanTask>>
  // Validates and creates a task from the current draft.
  addTask: () => void
  // Removes a task by id.
  removeTask: (taskId: KanbanTask['id']) => void
}

export function useKanbanTasks(): UseKanbanTasksResult {
  const columns = useSyncExternalStore(
    subscribeToKanbanTaskChanges,
    getKanbanColumnsWithTasks,
    getKanbanColumnsWithTasks,
  )
  const [draftTask, setDraftTask] = useState<DraftKanbanTask>(
    getDefaultDraftKanbanTask,
  )
  const [validationError, setValidationError] = useState('')

  function addTask(): void {
    const validationMessage = validateDraftKanbanTask(draftTask)

    if (validationMessage !== '') {
      setValidationError(validationMessage)
      return
    }

    addKanbanTask(draftTask)
    setValidationError('')
    setDraftTask({
      ...getDefaultDraftKanbanTask(),
      columnId: draftTask.columnId,
    })
  }

  function removeTask(taskId: KanbanTask['id']): void {
    removeKanbanTask(taskId)
  }

  return {
    columns,
    draftTask,
    validationError,
    setDraftTask,
    addTask,
    removeTask,
  }
}
