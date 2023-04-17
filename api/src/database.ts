import { AppDataSource } from "./data-source";

export async function initializeDatabase() {
  await AppDataSource.initialize();
  console.log("Database connected");
}
