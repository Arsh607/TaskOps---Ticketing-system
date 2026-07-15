import express, { type Request, type Response } from 'express';
import { prisma } from './lib/prisma.js';
import cors from 'cors';
import { corsOptions } from './config/cors.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);

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

app.listen(port, () => {
  console.log(`TaskOps API listening on port ${port}`);
});
