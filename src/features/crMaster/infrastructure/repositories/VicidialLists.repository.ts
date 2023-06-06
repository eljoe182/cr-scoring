import { DataSource } from "typeorm";
import { VicidialListsEntity } from "src/shared/infrastructure/persistance/entities";
import { IVicidialListsRepository } from "../interface";

export default class VicidialListsRepository implements IVicidialListsRepository {
  constructor(private orm: DataSource) {}

  public async getVicidialLists(): Promise<VicidialListsEntity[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(VicidialListsEntity);
    const result = (await repository.find({
      order: {
        campaignId: 'ASC',
      }
    })) as unknown as VicidialListsEntity[];
    orm.destroy();
    return result;
  }
}