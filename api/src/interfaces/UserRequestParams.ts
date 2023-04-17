import { FastifyRequest } from "fastify";

export interface UserIdParams {
  id: string;
}

export interface SignupRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RequestWithUser extends FastifyRequest {
  user?: {
    id: number;
  };
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
