import { FastifyRequest, FastifyInstance } from "fastify";

// Entities
import { User } from "../entities/User";

// Controllers
import { UserController } from "../controllers/UserController";

// Schemas
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "../schemas/userSchema";

// Interfaces
import {
  UserIdParams,
  SignupRequestBody,
  LoginRequestBody,
} from "../interfaces/UserRequestParams";

// Auth
import {
  generateToken,
  hashPassword,
  verifyPassword,
  verifyToken,
  isAuthenticated,
} from "../auth";

const userController = new UserController();

export function registerUserRoutes(server: FastifyInstance) {
  server.post<{ Body: SignupRequestBody }>(
    "/signup",
    { schema: createUserSchema },
    async (request, reply) => {
      const userData = request.body as SignupRequestBody;
      const hashedPassword = await hashPassword(userData.password);

      const user = new User();
      Object.assign(user, userData);
      user.password = hashedPassword;

      const createdUser = await userController.create(user);
      reply.code(201).send(createdUser);
    }
  );

  server.post<{ Body: LoginRequestBody }>("/login", async (request, reply) => {
    const { email, password } = request.body;

    // Vérifier si l'utilisateur existe dans la base de données
    const user = await userController.findOneByEmail(email);

    if (!user) {
      reply.status(401).send({ message: "Invalid email or password" });
      return;
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      reply.status(401).send({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken(user.id);
    reply.send({ token });
  });

  server.get("/users", { preHandler: isAuthenticated }, async () => {
    return await userController.findAll();
  });

  server.post<{ Body: { token: string } }>(
    "/verify-token",
    async (request, reply) => {
      const { token } = request.body;

      if (!token) {
        reply.status(400).send({ message: "Missing token" });
        return;
      }

      const userId = verifyToken(token);
      if (userId === null) {
        reply.status(401).send({ message: "Invalid or expired token" });
        return;
      }

      const user = await userController.findOne(userId);
      if (!user) {
        reply.status(404).send({ message: "User not found" });
        return;
      }

      const userResponse = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      reply.send(userResponse);
    }
  );

  server.get(
    "/user/:id",
    { schema: getUserSchema, preHandler: isAuthenticated },
    async (request: FastifyRequest<{ Params: UserIdParams }>) => {
      const id = parseInt(request.params.id);
      return await userController.findOne(id);
    }
  );

  server.put(
    "/user/:id",
    { schema: updateUserSchema, preHandler: isAuthenticated },
    async (request: FastifyRequest<{ Params: UserIdParams }>) => {
      const id = parseInt(request.params.id);
      return await userController.update(id, request.body);
    }
  );

  server.delete(
    "/user/:id",
    { schema: deleteUserSchema, preHandler: isAuthenticated },
    async (request: FastifyRequest<{ Params: UserIdParams }>) => {
      const id = parseInt(request.params.id);
      await userController.delete(id);
      return { message: "User deleted successfully" };
    }
  );
}
