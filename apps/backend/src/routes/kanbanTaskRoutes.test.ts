import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import test, { after, before } from 'node:test';
import type { Server } from 'node:http';
import { app } from '../app.js';

let server: Server;
let apiUrl: string;

before(async () => {
  await new Promise<void>((resolve, reject) => {
    server = app.listen(0, '127.0.0.1', (error?: Error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  const address = server.address() as AddressInfo;
  apiUrl = `http://127.0.0.1:${address.port}/api`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('GET routes reject unsupported query parameters', async () => {
  const taskResponse = await fetch(
    `${apiUrl}/kanban-tasks?unsupported=true`,
  );
  const columnResponse = await fetch(
    `${apiUrl}/kanban-columns?unsupported=true`,
  );

  assert.equal(taskResponse.status, 400);
  assert.equal(columnResponse.status, 400);
});

test('POST rejects an invalid Kanban task body', async () => {
  const response = await fetch(`${apiUrl}/kanban-tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'x', priority: 'Urgent', columnId: 8 }),
  });
  const body = (await response.json()) as { error: string };

  assert.equal(response.status, 400);
  assert.equal(body.error, 'Request validation failed.');
});

test('PATCH validates both the task ID and update body', async () => {
  const invalidIdResponse = await fetch(`${apiUrl}/kanban-tasks/not-a-number`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ columnId: 2 }),
  });
  const emptyUpdateResponse = await fetch(`${apiUrl}/kanban-tasks/1`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  assert.equal(invalidIdResponse.status, 400);
  assert.equal(emptyUpdateResponse.status, 400);
});

test('DELETE rejects invalid task IDs before reaching the service', async () => {
  const response = await fetch(`${apiUrl}/kanban-tasks/0`, {
    method: 'DELETE',
  });

  assert.equal(response.status, 400);
});
