export type KanbanTaskPriority = 'High' | 'Medium' | 'Low';

export type KanbanTaskColumnId = 1 | 2 | 3 | 4;

export interface KanbanTask {
  id: number;
  title: string;
  priority: KanbanTaskPriority;
  columnId: KanbanTaskColumnId;
}

export interface KanbanColumn {
  id: KanbanTaskColumnId;
  title: string;
  description: string;
}

export interface DraftKanbanTask {
  title: string;
  priority: KanbanTaskPriority;
  columnId: KanbanTaskColumnId;
}
