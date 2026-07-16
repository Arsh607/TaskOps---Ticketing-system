import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createKanbanTaskBodySchema,
  kanbanTaskIdParamsSchema,
  updateKanbanTaskBodySchema,
} from './kanbanTaskSchemas.js';

test('accepts a valid Kanban task creation request', () => {
  const result = createKanbanTaskBodySchema.safeParse({
    title: 'Implement persistent Kanban tasks',
    priority: 'High',
    columnId: 1,
  });

  assert.equal(result.success, true);
});

test('rejects invalid or unexpected Kanban task fields', () => {
  const invalidColumn = createKanbanTaskBodySchema.safeParse({
    title: 'Invalid column',
    priority: 'Medium',
    columnId: 9,
  });
  const unexpectedField = createKanbanTaskBodySchema.safeParse({
    title: 'Unexpected field',
    priority: 'Low',
    columnId: 2,
    owner: 'not-supported',
  });

  assert.equal(invalidColumn.success, false);
  assert.equal(unexpectedField.success, false);
});

test('requires at least one valid field when updating a task', () => {
  assert.equal(updateKanbanTaskBodySchema.safeParse({}).success, false);
  assert.equal(
    updateKanbanTaskBodySchema.safeParse({ columnId: 3 }).success,
    true,
  );
});

test('coerces positive task IDs and rejects invalid IDs', () => {
  const validId = kanbanTaskIdParamsSchema.safeParse({ taskId: '12' });

  assert.equal(validId.success, true);
  assert.equal(validId.data?.taskId, 12);
  assert.equal(
    kanbanTaskIdParamsSchema.safeParse({ taskId: 'not-a-number' }).success,
    false,
  );
});
