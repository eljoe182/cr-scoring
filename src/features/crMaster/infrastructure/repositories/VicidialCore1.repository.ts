import { DataSource } from 'typeorm';
import { IVicidialCoreRepository } from '@feat/crMaster/infrastructure/interface/IVicidialCoreRepository';
import { FRVicidialList } from '@shared/domain/entities/CRMaster';

export default class VicidialCore1Repository implements IVicidialCoreRepository {
  constructor(private orm: DataSource) {}

  public async getInfo(listId: number): Promise<FRVicidialList[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.getRepository(FRVicidialList);
    const result = await repository.find({
      where: {
        listId,
      },
    });
    orm.destroy();
    return result;
  }
}
