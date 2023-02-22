import { DataSource } from "typeorm";
import { VicidialLists } from "@shared/domain/entities/CRMaster/FRVicidialLists.entity";
import { IVicidialListsRepository } from "../interface/IVicidialListsRepository";

export default class VicidialListsRepository implements IVicidialListsRepository {
  constructor(private orm: DataSource) {}

  public async getVicidialLists(): Promise<VicidialLists[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(VicidialLists);
    const result = (await repository.find({
      where: {
        active: 'Y',
      }
    })) as unknown as VicidialLists[];
    orm.destroy();
    return result;
  }
}