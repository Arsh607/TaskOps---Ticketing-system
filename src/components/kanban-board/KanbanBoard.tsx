import { type Dispatch, type FormEvent, type SetStateAction, useState } from "react";
import "./KanbanBoard.css";

interface KanbanTask {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
}

interface KanbanColumn {
  id: number;
  title: string;
  description: string;
  tasks: KanbanTask[];
}

type DraftTask = {
  title: string;
  columnId: number;
  priority: KanbanTask["priority"];
};

interface KanbanTaskFormProps {
  draftTask: DraftTask;
  setDraftTask: Dispatch<SetStateAction<DraftTask>>;
  columns: KanbanColumn[];
  validationError: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const initialKanbanColumns: KanbanColumn[] = [
  {
    id: 1,
    title: "To Do",
    description: "Tasks waiting to be started.",
    tasks: [
      {
        id: 101,
        title: "Create ticket display layout",
        priority: "Medium",
      },
      {
        id: 102,
        title: "Plan dashboard structure and components",
        priority: "Low",
      },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    description: "Tasks currently being worked on.",
    tasks: [
      {
        id: 201,
        title: "Preliminary Kanban board design and layout",
        priority: "High",
      },
      {
        id: 202,
        title: "Preliminary ticket details page design and layout",
        priority: "Medium",
      },
    ],
  },
  {
    id: 3,
    title: "Review",
    description: "Tasks ready for team review.",
    tasks: [
      {
        id: 301,
        title: "Review style guide and README documentation",
        priority: "High",
      },
    ],
  },
  {
    id: 4,
    title: "Done",
    description: "Completed workflow items.",
    tasks: [
      {
        id: 401,
        title: "Set up TaskOps project structure",
        priority: "Low",
      },
    ],
  },
];

const defaultDraftTask: DraftTask = {
  title: "",
  columnId: initialKanbanColumns[0].id,
  priority: "Medium",
};

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
              columnId: Number(event.target.value),
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

export default function KanbanBoard() {
  const [kanbanColumns, setKanbanColumns] =
    useState<KanbanColumn[]>(initialKanbanColumns);
  const [draftTask, setDraftTask] = useState<DraftTask>(defaultDraftTask);
  const [validationError, setValidationError] = useState("");

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = draftTask.title.trim();
    if (!trimmedTitle) {
      setValidationError("Task title is required.");
      return;
    }

    setKanbanColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.id === draftTask.columnId
          ? {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  id: Date.now(),
                  title: trimmedTitle,
                  priority: draftTask.priority,
                },
              ],
            }
          : column
      )
    );

    setDraftTask((currentDraft) => ({
      ...defaultDraftTask,
      columnId: currentDraft.columnId,
    }));
    setValidationError("");
  };

  const removeTask = (taskId: number) => {
    setKanbanColumns((currentColumns) =>
      currentColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }))
    );
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
        columns={kanbanColumns}
        validationError={validationError}
        onSubmit={addTask}
      />

      <ul className="kanban-board__columns" aria-label="Kanban workflow columns">
        {kanbanColumns.map((column) => (
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
