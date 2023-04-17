import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Engine } from "./entities/Engine";
import { Bookings } from "./entities/Bookings";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "W4815162342..",
  database: "wiame-rent-engine",
  synchronize: true,
  logging: false,
  entities: [User, Engine, Bookings],
  migrations: [],
  subscribers: [],
});
