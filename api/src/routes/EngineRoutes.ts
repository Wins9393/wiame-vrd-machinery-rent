import { FastifyRequest, FastifyInstance } from "fastify";

// Entities
import { Engine } from "../entities/Engine";

// Controllers
import { EngineController } from "../controllers/EngineController";

// Schemas
import {
  createEngineSchema,
  getEngineSchema,
  updateEngineSchema,
  deleteEngineSchema,
} from "../schemas/engineSchema";

// Interfaces
import { EngineIdParams } from "../interfaces/EngineRequestParams";

// Auth (Sécuriser les routes)
import { isAuthenticated } from "../auth";

const engineController = new EngineController();

export function registerEngineRoutes(server: FastifyInstance) {
  server.post(
    "/engine",
    { schema: createEngineSchema },
    async (request, reply) => {
      const engineData = request.body as Engine;
      const engine = new Engine();
      Object.assign(engine, engineData);
      const createdEngine = await engineController.create(engine);
      reply.code(201).send(createdEngine);
    }
  );

  server.get("/engines", async () => {
    return await engineController.findAll();
  });

  server.get(
    "/engine/:id",
    { schema: getEngineSchema },
    async (request: FastifyRequest<{ Params: EngineIdParams }>) => {
      const id = parseInt(request.params.id);
      return await engineController.findOne(id);
    }
  );

  server.put(
    "/engine/:id",
    { schema: updateEngineSchema },
    async (request: FastifyRequest<{ Params: EngineIdParams }>) => {
      const id = parseInt(request.params.id);
      return await engineController.update(id, request.body);
    }
  );

  server.delete(
    "/engine/:id",
    { schema: deleteEngineSchema },
    async (request: FastifyRequest<{ Params: EngineIdParams }>) => {
      const id = parseInt(request.params.id);
      await engineController.delete(id);
      return { message: "Engine deleted successfully" };
    }
  );
}
