import { FastifyRequest, FastifyInstance } from "fastify";

// Entities
import { Bookings } from "../entities/Bookings";

// Controllers
import { BookingsController } from "../controllers/BookingsController";
import { EngineController } from "../controllers/EngineController";
import { UserController } from "../controllers/UserController";

// Schemas
import {
  createBookingSchema,
  getBookingSchema,
  updateBookingSchema,
  deleteBookingSchema,
} from "../schemas/bookingsSchema";

// Interfaces
import {
  BookingsIdParams,
  BookingsRequestBody,
  BookingsUpdateRequestBody,
} from "../interfaces/BookingsRequestParams";

// Auth
import { isAuthenticated } from "../auth";

const bookingsController = new BookingsController();
const engineController = new EngineController();
const userController = new UserController();

export function registerBookingsRoutes(server: FastifyInstance) {
  server.post(
    "/booking",
    { schema: createBookingSchema, preHandler: isAuthenticated },
    async (request: FastifyRequest<{ Body: BookingsRequestBody }>, reply) => {
      const { engine_id, user_id, start_date, end_date } = request.body;
      const engine = await engineController.findOne(engine_id);
      const user = await userController.findOne(user_id);

      if (!engine || !user) {
        reply.code(400).send({ message: "Invalid engine or user ID." });
        return;
      }

      const booking = new Bookings();
      booking.engine = engine;
      booking.user = user;
      booking.startDate = new Date(start_date);
      booking.endDate = new Date(end_date);

      const createdBooking = await bookingsController.create(booking);
      reply.code(201).send(booking);
    }
  );

  server.get(
    "/bookings",
    { preHandler: isAuthenticated },
    async (request: FastifyRequest<{ Params: BookingsIdParams }>, reply) => {
      const bookings = await bookingsController.findAllWithRelations();
      reply.send(bookings);
    }
  );

  server.get(
    "/booking/:id",
    { schema: getBookingSchema, preHandler: isAuthenticated },
    async (request: FastifyRequest<{ Params: BookingsIdParams }>, reply) => {
      const id = parseInt(request.params.id);

      const booking = await bookingsController.findOneWithRelations(id);

      if (!booking) {
        reply.code(404).send({ message: "Booking not found" });
        return;
      }

      reply.send(booking);
    }
  );

  server.put(
    "/booking/:id",
    { schema: updateBookingSchema, preHandler: isAuthenticated },
    async (
      request: FastifyRequest<{
        Params: BookingsIdParams;
        Body: BookingsUpdateRequestBody;
      }>,
      reply
    ) => {
      const id = parseInt(request.params.id);
      const { engine_id, user_id, start_date, end_date } = request.body;

      const engine = engine_id
        ? await engineController.findOne(engine_id)
        : undefined;
      const user = user_id ? await userController.findOne(user_id) : undefined;

      if ((engine_id && !engine) || (user_id && !user)) {
        reply.code(400).send({ message: "Invalid engine or user ID." });
        return;
      }

      const updatedBooking = await bookingsController.update(id, {
        engine,
        user,
        startDate: new Date(start_date),
        endDate: new Date(end_date),
      });

      if (!updatedBooking) {
        reply.code(404).send({ message: "Booking not found" });
        return;
      }

      reply.send(updatedBooking);
    }
  );

  server.delete(
    "/booking/:id",
    { schema: deleteBookingSchema, preHandler: isAuthenticated },
    async (request: FastifyRequest<{ Params: BookingsIdParams }>, reply) => {
      const id = parseInt(request.params.id);
      const deleted = await bookingsController.delete(id);

      reply.send({ message: "Booking deleted successfully" });
    }
  );
}
