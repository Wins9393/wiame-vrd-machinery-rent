import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "./interfaces/UserRequestParams";

const SECRET = "wiame-vrd-secret";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

export function generateToken(userId: number): string {
  const token = jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
  return token;
}

export function verifyToken(token: string): number | null {
  try {
    const decoded = jwt.verify(token, SECRET) as { userId: number };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export async function isAuthenticated(
  request: RequestWithUser,
  reply: FastifyReply,
  next: () => void
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    reply.status(401).send({ message: "Missing authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const userId = verifyToken(token);

  if (!userId) {
    reply.status(401).send({ message: "Invalid token" });
    return;
  }

  request.user = { id: userId };
  next();
}
