import { DataSource } from "typeorm";
import { VicidialListsEntity, VicidialLists1121Entity, VicidialLists2121Entity } from "src/shared/infrastructure/persistance/entities";
import { IVicidialListsRepository } from "../interface";

export default class VicidialListsRepository implements IVicidialListsRepository {
  constructor(private orm: DataSource) {}

  public async getVicidialLists(): Promise<VicidialListsEntity[]> {
    const orm = await this.orm.initialize();
    const repositoryCore1 = orm.manager.getRepository(VicidialListsEntity);
    const repositoryCore11 = orm.manager.getRepository(VicidialLists1121Entity);
    const repositoryCore21 = orm.manager.getRepository(VicidialLists2121Entity);
    const resultCore1 = (await repositoryCore1.find({
      order: {
        campaignId: 'ASC',
      },
    })) as unknown as VicidialListsEntity[];
    const resultCore11 = (await repositoryCore11.find({
      order: {
        campaignId: 'ASC',
      },
    })) as unknown as VicidialListsEntity[];
    const resultCore21 = (await repositoryCore21.find({
      order: {
        campaignId: 'ASC',
      },
    })) as unknown as VicidialListsEntity[];

    const result = [...resultCore1, ...resultCore11, ...resultCore21];
    orm.destroy();
    return result;
  }
}