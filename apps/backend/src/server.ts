import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/cors.js';
import ticketsRouter from './api/tickets.js';

const port = Number(process.env.PORT ?? 3000);

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok', service: 'taskops-api' });
});

app.use('/tickets', ticketsRouter);

app.listen(port, () => {
  console.log(`TaskOps API listening on port ${port}`);
});
