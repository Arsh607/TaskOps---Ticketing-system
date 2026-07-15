import type { CorsOptions } from "cors";

const localFrontendUrl = "http://localhost:5173";

const allowedOrigins = [
  process.env.FRONTEND_URL,
  localFrontendUrl,
].filter((origin): origin is string => Boolean(origin));

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked request from origin: ${origin}`));
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],

  credentials: false,

  optionsSuccessStatus: 204,
};