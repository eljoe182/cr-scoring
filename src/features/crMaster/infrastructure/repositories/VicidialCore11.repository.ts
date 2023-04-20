import { DataSource } from 'typeorm';
import { IVicidialCoreRepository } from 'src/features/crMaster/infrastructure/interface';
import { FRVicidialList, FRVicidialList1121Entity } from 'src/shared/infrastructure/persistance/entities';

export default class VicidialCore11Repository implements IVicidialCoreRepository<FRVicidialList> {
  constructor(private orm: DataSource) {}

  public async getInfo(listId: number): Promise<FRVicidialList[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.getRepository(FRVicidialList1121Entity);
    const result = await repository.find({
      where: {
        listId,
      },
    });
    orm.destroy();
    return result;
  }
}
