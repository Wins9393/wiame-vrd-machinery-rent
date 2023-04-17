import { AppDataSource } from "../data-source";
import { Engine } from "../entities/Engine";

export class EngineController {
  async create(engine: Engine): Promise<Engine> {
    return await AppDataSource.manager.save(engine);
  }

  async findAll(): Promise<Engine[]> {
    return await AppDataSource.manager.find(Engine);
  }

  async findOne(id: number): Promise<Engine | undefined> {
    return await AppDataSource.manager.findOne(Engine, { where: { id } });
  }

  async update(
    id: number,
    engine: Partial<Engine>
  ): Promise<Engine | undefined> {
    await AppDataSource.manager.update(Engine, id, engine);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await AppDataSource.manager.delete(Engine, id);
  }
}
