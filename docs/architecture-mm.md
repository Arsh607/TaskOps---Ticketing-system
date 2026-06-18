# KanbanTask Architecture

This document explains how the KanbanTask feature is organized in the project.

The data flow chain is:

KanbanBoard
-> useKanbanTasks
-> kanbanTaskService
-> kanbanTaskRepository
-> kanbanTaskTestData

## KanbanTask Type

### What does this implementation do?

The KanbanTask type file defines the shape of the Kanban task data. It includes the task id, title, priority, and column id. It also defines the column type and the draft task type used when creating a new task.

### How did I decide what logic to include there, and how does that separate concerns?

This file only contains TypeScript types and interfaces. It does not store data or change data. This keeps the data structure separate from the logic that uses it.

### Where is this implementation used in the project and how?

The repository, service, hook, and KanbanBoard component use these types so they all agree on what a KanbanTask looks like.

## kanbanTaskTestData

### What does this implementation do?

The kanbanTaskTestData file provides sample KanbanTask objects for the project. These tasks represent realistic TaskOps ticketing work and are assigned to the To Do, In Progress, Review, and Done columns.

### How did I decide what logic to include there, and how does that separate concerns?

This file only contains test data. It does not contain business logic, React state, or UI code. This makes it easy to replace the test data later without changing the component.

### Where is this implementation used in the project and how?

The repository imports kanbanTaskTestData and uses it to initialize the in-memory task list.

## kanbanTaskRepository

### What does this implementation do?

The kanbanTaskRepository stores the KanbanTask data in memory. It provides basic CRUD functions to get, create, update, and delete tasks. It also has a small subscription system so other parts of the app can be notified when the task data changes.

### How did I decide what logic to include there, and how does that separate concerns?

The repository is responsible for storing and modifying data. It does not validate form input and it does not know about React components. This keeps data access separate from business rules and UI behavior.

### Where is this implementation used in the project and how?

The service calls the repository methods when it needs to read or change KanbanTask data. The repository uses test data now, but it could later be changed to request KanbanTask data from a backend service.

## kanbanTaskService

### What does this implementation do?

The kanbanTaskService contains the business logic for KanbanTask. It defines the four Kanban columns, validates draft task titles, groups tasks into columns, creates new tasks, moves tasks, removes tasks, and exposes task change subscriptions.

### How did I decide what logic to include there, and how does that separate concerns?

The service contains rules about how Kanban tasks should work. For example, it checks that task titles are not empty and are at least three characters long. This logic belongs in the service because it is not just a UI detail and should not be mixed into the component.

### Where is this implementation used in the project and how?

The useKanbanTasks hook calls the service to get grouped columns, validate new tasks, add tasks, remove tasks, and subscribe to task changes.

## useKanbanTasks

### What does this implementation do?

The useKanbanTasks hook connects React to the KanbanTask service. It uses useSyncExternalStore to update the UI when repository data changes. It also stores the draft task form state and the current validation error.

### How did I decide what logic to include there, and how does that separate concerns?

The hook contains React interaction state. This includes form state, validation message state, and UI actions like addTask and removeTask. It calls the service instead of directly changing repository data, so React logic stays separate from business logic.

### Where is this implementation used in the project and how?

The KanbanBoard component calls useKanbanTasks to get the columns, draft task, validation error, and task actions it needs to render the board.

## KanbanBoard Component

### What does this implementation do?

The KanbanBoard component renders the Kanban board UI. It displays columns, shows tasks inside each column, lets the user add a task, lets the user remove a task, and displays validation errors.

### How did I decide what logic to include there, and how does that separate concerns?

The component only handles rendering and form events. It does not define test data, store the main task list, or validate task titles directly. Those responsibilities are handled by the hook, service, and repository.

### Where is this implementation used in the project and how?

The KanbanBoard component is used in the app UI to show the Kanban feature. It starts the architecture chain by calling useKanbanTasks, which then calls the service, which then calls the repository, which starts from kanbanTaskTestData.
