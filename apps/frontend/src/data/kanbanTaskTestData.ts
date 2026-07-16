import type { KanbanTask } from '../types/KanbanTask';

export const kanbanTaskTestData: KanbanTask[] = [
  {
    id: 1,
    title: 'Create ticket intake form validation',
    priority: 'High',
    columnId: 1,
  },
  {
    id: 2,
    title: 'Add assignee filter to Kanban board',
    priority: 'Medium',
    columnId: 1,
  },
  {
    id: 3,
    title: 'Draft priority labels for support tickets',
    priority: 'Low',
    columnId: 1,
  },
  {
    id: 4,
    title: 'Build drag and drop task movement',
    priority: 'High',
    columnId: 2,
  },
  {
    id: 5,
    title: 'Connect ticket list to task repository',
    priority: 'Medium',
    columnId: 2,
  },
  {
    id: 6,
    title: 'Review empty-state copy for Kanban columns',
    priority: 'Low',
    columnId: 3,
  },
  {
    id: 7,
    title: 'QA edit flow for existing tickets',
    priority: 'High',
    columnId: 3,
  },
  {
    id: 8,
    title: 'Verify completed tickets remain archived',
    priority: 'Medium',
    columnId: 4,
  },
  {
    id: 9,
    title: 'Close resolved onboarding support ticket',
    priority: 'Low',
    columnId: 4,
  },
  {
    id: 10,
    title: 'Confirm task count badges update by column',
    priority: 'Medium',
    columnId: 4,
  },
];
