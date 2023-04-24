import "reflect-metadata";
import fastify, { FastifyInstance } from "fastify";
import cors, { FastifyCorsOptions } from "@fastify/cors";

import { initializeDatabase } from "./database";

// Routes imports
import { registerEngineRoutes } from "./routes/EngineRoutes";
import { registerUserRoutes } from "./routes/UserRoutes";
import { registerBookingsRoutes } from "./routes/BookingsRoutes";

const server: FastifyInstance = fastify();

// Routes calls
registerEngineRoutes(server);
registerUserRoutes(server);
registerBookingsRoutes(server);

const corsOptions: FastifyCorsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  credentials: true,
};

(async () => {
  try {
    await server.register(cors, corsOptions);

    await initializeDatabase(); // Initialise la base de données

    const address = await server.listen({ port: 8080 });
    console.log(`Server listening at ${address}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
