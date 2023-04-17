import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserController {
  async create(user: User): Promise<User> {
    return await AppDataSource.manager.save(user);
  }

  async findAll(): Promise<User[]> {
    return await AppDataSource.manager.find(User);
  }

  async findOne(id: number): Promise<User | undefined> {
    return await AppDataSource.manager.findOne(User, { where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await AppDataSource.manager.findOne(User, { where: { email } });
  }

  async update(id: number, user: Partial<User>): Promise<User | undefined> {
    await AppDataSource.manager.update(User, id, user);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await AppDataSource.manager.delete(User, id);
  }
}
