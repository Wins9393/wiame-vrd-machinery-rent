import { AppDataSource } from "../data-source";
import { Bookings } from "../entities/Bookings";

export class BookingsController {
  async create(bookings: Bookings): Promise<Bookings> {
    return await AppDataSource.manager.save(bookings);
  }

  async findAll(): Promise<Bookings[]> {
    return await AppDataSource.manager.find(Bookings);
  }

  async findAllWithRelations(): Promise<Bookings[]> {
    return await AppDataSource.manager.find(Bookings, {
      relations: ["engine", "user"],
    });
  }

  async findOne(id: number): Promise<Bookings | undefined> {
    return await AppDataSource.manager.findOne(Bookings, { where: { id } });
  }

  async findOneWithRelations(id: number): Promise<Bookings | undefined> {
    return await AppDataSource.manager.findOne(Bookings, {
      where: { id },
      relations: ["engine", "user"],
    });
  }

  async update(
    id: number,
    bookings: Partial<Bookings>
  ): Promise<Bookings | undefined> {
    await AppDataSource.manager.update(Bookings, id, bookings);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await AppDataSource.manager.delete(Bookings, id);
  }
}
