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

export default function KanbanBoard() {
  const kanbanColumns: KanbanColumn[] = [
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
          title: "Plan dashboard stucture and components",
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
          title: "Review styleguide and readme documentation",
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

  return (
    <section className="kanban-board" aria-labelledby="kanban-board-title">
      <header className="kanban-board__header">
        <h2 id="kanban-board-title">Kanban Board</h2>
        <p>
          Organize your project tickets by workflow stage and priority.
        </p>
      </header>

      <ul className="kanban-board__columns" aria-label="Kanban workflow columns">
        {kanbanColumns.map((column) => (
          <li className="kanban-board__column" key={column.id}>
            <article className="kanban-board__panel">
              <header className="kanban-board__column-header">
                <h3>{column.title}</h3>
                <p>{column.description}</p>
              </header>

              <ul className="kanban-board__tasks" aria-label={`${column.title} tasks`}>
                {column.tasks.map((task) => (
                  <li className="kanban-board__task" key={task.id}>
                    <h4>{task.title}</h4>
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