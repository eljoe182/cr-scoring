import { DataSource } from 'typeorm';
import { IVicidialCoreRepository } from 'src/features/crMaster/infrastructure/interface';
import { FRVicidialList, FRVicidialListEntity } from 'src/shared/infrastructure/persistance/entities';

export default class VicidialCore1Repository implements IVicidialCoreRepository<FRVicidialList> {
  constructor(private orm: DataSource) {}

  public async getInfo(listId: number): Promise<FRVicidialList[]> {
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
