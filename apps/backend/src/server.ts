import express, { type Request, type Response } from 'express';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get('/health', (_request: Request, response: Response) => {
  response.status(200).json({ status: 'ok', service: 'taskops-api' });
});

app.listen(port, () => {
  console.log(`TaskOps API listening on port ${port}`);
});
