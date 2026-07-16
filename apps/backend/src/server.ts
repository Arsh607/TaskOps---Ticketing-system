import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";

import { prisma } from "./lib/prisma.js";
import { corsOptions } from "./config/cors.js";
import ticketUpdateRouter from "./routes/ticketUpdateRoutes.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

// Apply CORS before defining routes so all incoming requests are checked.
app.use(cors(corsOptions));

// Allow Express to read JSON request bodies.
app.use(express.json());

app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({
    status: "ok",
    service: "taskops-api",
  });
});

app.get("/tickets", async (
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

// Registers the Ticket Update endpoints under /api.
app.use("/api", ticketUpdateRouter);

// Handles errors passed from controllers and routes.
app.use((
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.error(error);

  response.status(500).json({
    error: "An unexpected server error occurred.",
  });
});

app.listen(port, () => {
  console.log(`TaskOps API listening on port ${port}`);
});