# Kanban Resource Architecture

This document explains how the Kanban feature persists its state through the
TaskOps frontend, backend, Prisma ORM, and PostgreSQL database.

The complete data flow is:

```text
KanbanBoard
  -> useKanbanTasks
  -> frontend kanbanTaskService
  -> frontend kanbanTaskRepository (fetch)
  -> Express Kanban route
  -> Zod validation middleware
  -> kanbanTaskController
  -> backend kanbanTaskService
  -> Prisma Client
  -> PostgreSQL
```

The shared view counter is not part of this persistence work. The Kanban
resource independently meets requirements I.1 through I.4.

## Backend Resource Endpoints

The backend exposes only the routes needed by the Kanban UI:

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/kanban-columns` | Read the available workflow columns |
| GET | `/api/kanban-tasks` | Read all persisted tasks |
| POST | `/api/kanban-tasks` | Create a task |
| PATCH | `/api/kanban-tasks/:taskId` | Update a task, including moving it |
| DELETE | `/api/kanban-tasks/:taskId` | Remove a task |

Each route uses a Zod request schema through `validateRequest`. Invalid bodies,
parameters, and query strings receive a `400` response before reaching a
controller. Controllers handle HTTP concerns and call the backend service. The
service contains data-access operations and sends them to PostgreSQL through
the shared Prisma client.

Successful requests return `200`, `201`, or `204` as appropriate. Missing task
IDs return `404`, and unexpected server errors are handled by the central error
middleware.

## Database Schema and Migration

Prisma defines `KanbanColumn`, `KanbanTask`, and `KanbanPriority`. Each task has
a foreign key to exactly one workflow column. Column titles and descriptions
are stored once in `KanbanColumn` instead of being repeated in each task.

This design conforms to Third Normal Form:

- Every table has a primary key.
- Each field contains one atomic value.
- Task fields depend on the task primary key.
- Column descriptions depend on the column primary key.
- Reusable column details are referenced through a foreign key rather than
  duplicated in task rows.

Migration `20260716000000_add_kanban_resources` creates the enum, tables,
indexes, relationship, four workflow columns, and initial Kanban task records.

## Frontend Repository Uses the Backend

The frontend repository no longer imports `kanbanTaskTestData` or stores a
mutable in-memory task list. Its methods send HTTP requests to the Kanban API.
The API base URL can be configured with `VITE_API_URL` and defaults to
`http://localhost:3000/api` for local development.

The service retains frontend business rules, such as trimming and validating
task titles and grouping returned tasks into their workflow columns. The React
hook owns loading, saving, request-error, form, column, and task state.

## Visible Application-State Persistence

When the Kanban page opens, the hook reads columns and tasks from the backend.
Adding a task sends POST, moving it sends PATCH, and removing it sends DELETE.
The UI uses the records returned by the backend to update its state.

The **Move to** selector is the visible read/update persistence example:

1. A user moves a task to a different workflow column.
2. The repository sends PATCH with the new `columnId`.
3. Prisma updates the corresponding PostgreSQL row.
4. Refreshing or reopening the page sends GET again.
5. The task remains in its updated column.

## Verification

Every Kanban route uses the validation middleware and an appropriate Zod
schema before its controller runs. Verify the project from the repository root:

```powershell
npm run lint
npm run build
```

Apply the committed migrations to a configured database with:

```powershell
npx prisma migrate deploy
```
