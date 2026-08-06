import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express, { type Request, type Response } from 'express';
import ticketsRouter from './api/tickets.js';
import { corsOptions } from './config/cors.js';
import { clerkConfig } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requireAuthentication } from './middleware/requireAuthentication.js';
import ticketUpdateRouter from './routes/ticketUpdateRoutes.js';
import {
  kanbanColumnRouter,
  kanbanTaskRouter,
} from './routes/kanbanTaskRoutes.js';

export const app = express();

app.use(clerkMiddleware(clerkConfig));
app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (_request: Request, response: Response) => {
  response.status(200).json({ status: 'ok', service: 'taskops-api' });
});

app.use('/tickets', requireAuthentication, ticketsRouter);
app.use('/api', requireAuthentication);
app.use('/api', ticketUpdateRouter);
app.use('/api/kanban-columns', kanbanColumnRouter);
app.use('/api/kanban-tasks', kanbanTaskRouter);
app.use(errorHandler);
