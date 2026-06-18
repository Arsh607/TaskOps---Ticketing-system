import { type Dispatch, type FormEvent, type SetStateAction } from "react";
import { useKanbanTasks } from "../../hooks/useKanbanTasks";
import type {
  KanbanColumn,
  DraftKanbanTask,
  KanbanTask,
  KanbanTaskColumnId,
} from "../../types/KanbanTask";
import "./KanbanBoard.css";

interface KanbanColumnWithTasks extends KanbanColumn {
  tasks: KanbanTask[];
}

interface KanbanTaskFormProps {
  draftTask: DraftKanbanTask;
  setDraftTask: Dispatch<SetStateAction<DraftKanbanTask>>;
  columns: KanbanColumnWithTasks[];
  validationError: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function KanbanTaskForm({
  draftTask,
  setDraftTask,
  columns,
  validationError,
  onSubmit,
}: KanbanTaskFormProps) {
  return (
    <form className="kanban-board__form" onSubmit={onSubmit}>
      <label>
        Task title
        <input
          type="text"
          value={draftTask.title}
          placeholder="Enter a ticket task"
          onChange={(event) =>
            setDraftTask((currentDraft) => ({
              ...currentDraft,
              title: event.target.value,
            }))
          }
          aria-invalid={validationError ? "true" : "false"}
        />
      </label>

      <label>
        Column
        <select
          value={draftTask.columnId}
          onChange={(event) =>
            setDraftTask((currentDraft) => ({
              ...currentDraft,
              columnId: Number(event.target.value) as KanbanTaskColumnId,
            }))
          }
        >
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
      </label>

      <label>
        Priority
        <select
          value={draftTask.priority}
          onChange={(event) =>
            setDraftTask((currentDraft) => ({
              ...currentDraft,
              priority: event.target.value as KanbanTask["priority"],
            }))
          }
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>

      <button type="submit">Add task</button>
      {validationError && (
        <p className="kanban-board__form-error">{validationError}</p>
      )}
    </form>
  );
}

/*
 * This component uses the hook-service-repository architecture.
 * The component renders the Kanban UI.
 * The hook manages React interaction state.
 * The service handles validation and task business rules.
 * The repository stores and modifies KanbanTask data.
 */
export default function KanbanBoard() {
  const {
    columns,
    draftTask,
    validationError,
    setDraftTask,
    addTask,
    removeTask,
  } = useKanbanTasks();

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask();
  };

  return (
    <section className="kanban-board" aria-labelledby="kanban-board-title">
      <header className="kanban-board__header">
        <h2 id="kanban-board-title">Kanban Board</h2>
        <p>Organize your project tickets by workflow stage and priority.</p>
      </header>

      <KanbanTaskForm
        draftTask={draftTask}
        setDraftTask={setDraftTask}
        columns={columns}
        validationError={validationError}
        onSubmit={handleAddTask}
      />

      <ul className="kanban-board__columns" aria-label="Kanban workflow columns">
        {columns.map((column) => (
          <li className="kanban-board__column" key={column.id}>
            <article className="kanban-board__panel">
              <header className="kanban-board__column-header">
                <h3>{column.title}</h3>
                <p>{column.description}</p>
              </header>

              <ul
                className="kanban-board__tasks"
                aria-label={`${column.title} tasks`}
              >
                {column.tasks.map((task) => (
                  <li className="kanban-board__task" key={task.id}>
                    <div className="kanban-board__task-heading">
                      <h4>{task.title}</h4>
                      <button
                        type="button"
                        onClick={() => removeTask(task.id)}
                        aria-label={`Remove ${task.title}`}
                      >
                        Remove
                      </button>
                    </div>
                    <p>
                      Priority:{" "}
                      <span
                        className={`kanban-board__priority kanban-board__priority--${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
