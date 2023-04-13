import { DataSource } from 'typeorm';
import { IVicidialCoreRepository } from '../../../../features/crMaster/infrastructure/interface';
import { FRVicidialListEntity } from '../../../../shared/infrastructure/persistance/entities';

export default class VicidialCore1Repository implements IVicidialCoreRepository {
  constructor(private orm: DataSource) {}

  public async getInfo(listId: number): Promise<FRVicidialListEntity[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.getRepository(FRVicidialListEntity);
    const result = await repository.find({
      where: {
        listId,
      },
    });
    orm.destroy();
    return result;
  }
}
