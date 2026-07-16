import cors from 'cors';
import express, { type Request, type Response } from 'express';
import ticketsRouter from './api/tickets.js';
import { corsOptions } from './config/cors.js';
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

app.use('/tickets', ticketsRouter);
app.use('/api/kanban-columns', kanbanColumnRouter);
app.use('/api/kanban-tasks', kanbanTaskRouter);
app.use(errorHandler);
