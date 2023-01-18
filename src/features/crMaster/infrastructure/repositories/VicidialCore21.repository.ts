import { DataSource } from 'typeorm';
import { IVicidialCoreRepository } from '@feat/crMaster/domain/interface/IVicidialCoreRepository';
import { FRVicidialList2121 } from '@shared/domain/entities/CRMaster';

export default class VicidialCore21Repository implements IVicidialCoreRepository {
  constructor(private orm: DataSource) {}

  public async getInfo(listId: number): Promise<FRVicidialList2121[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.getRepository(FRVicidialList2121);
    const result = await repository.find({
      where: {
        listId,
      },
    });
    orm.destroy();
    return result;
  }
}
