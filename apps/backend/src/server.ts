import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";

import { corsOptions } from "./config/cors.js";
import ticketsRouter from "./api/tickets.js";
import ticketUpdateRouter from "./routes/ticketUpdateRoutes.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

// Apply CORS before the routes.
app.use(cors(corsOptions));

// Parse incoming JSON request bodies.
app.use(express.json());

app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({
    status: "ok",
    service: "taskops-api",
  });
});

// Existing Ticket CRUD routes.
app.use("/tickets", ticketsRouter);

// Ticket Update routes.
app.use("/api", ticketUpdateRouter);

// Handle unexpected errors passed from routes and controllers.
app.use(
  (
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    console.error(error);

    response.status(500).json({
      error: "An unexpected server error occurred.",
    });
  },
);

app.listen(port, () => {
  console.log(`TaskOps API listening on port ${port}`);
});