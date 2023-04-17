import "reflect-metadata";
import fastify from "fastify";

import { initializeDatabase } from "./database";

// Routes imports
import { registerEngineRoutes } from "./routes/EngineRoutes";
import { registerUserRoutes } from "./routes/UserRoutes";
import { registerBookingsRoutes } from "./routes/BookingsRoutes";

const server = fastify();

// Routes calls
registerEngineRoutes(server);
registerUserRoutes(server);
registerBookingsRoutes(server);

(async () => {
  try {
    await initializeDatabase(); // Initialise la base de données

    const address = await server.listen({ port: 8080 });
    console.log(`Server listening at ${address}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
