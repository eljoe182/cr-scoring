import { DataSource } from 'typeorm';
import { IVicidialCoreRepository } from '../../../../features/crMaster/infrastructure/interface/IVicidialCoreRepository';
import { FRVicidialList1121Entity } from '../../../../shared/infrastructure/persistance/entities';

export default class VicidialCore11Repository implements IVicidialCoreRepository {
  constructor(private orm: DataSource) {}

  public async getInfo(listId: number): Promise<FRVicidialList1121Entity[]> {
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
