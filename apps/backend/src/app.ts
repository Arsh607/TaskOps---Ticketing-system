import cors from 'cors';
import express, { type Request, type Response } from 'express';
import { corsOptions } from './config/cors.js';
import { prisma } from './lib/prisma.js';
import { errorHandler } from './middleware/errorHandler.js';
import {
  kanbanColumnRouter,
  kanbanTaskRouter,
} from './routes/kanbanTaskRoutes.js';

export const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (_request: Request, response: Response) => {
  response.status(200).json({ status: 'ok', service: 'taskops-api' });
});

app.get('/tickets', async (_request: Request, response: Response) => {
  const tickets = await prisma.ticket.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      owner: true,
    },
  });

  response.status(200).json(tickets);
});

app.use('/api/kanban-columns', kanbanColumnRouter);
app.use('/api/kanban-tasks', kanbanTaskRouter);
app.use(errorHandler);
