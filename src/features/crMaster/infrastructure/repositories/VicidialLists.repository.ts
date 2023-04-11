import { DataSource } from "typeorm";
import { VicidialListsEntity } from "../../../../shared/infrastructure/persistance/entities";
import { IVicidialListsRepository } from "../interface/IVicidialListsRepository";

export default class VicidialListsRepository implements IVicidialListsRepository {
  constructor(private orm: DataSource) {}

  public async getVicidialLists(): Promise<VicidialListsEntity[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(VicidialListsEntity);
    const result = (await repository.find({
      where: {
        active: 'Y',
      },
      order: {
        campaignId: 'ASC',
      }
    })) as unknown as VicidialListsEntity[];
    orm.destroy();
    return result;
  }
}