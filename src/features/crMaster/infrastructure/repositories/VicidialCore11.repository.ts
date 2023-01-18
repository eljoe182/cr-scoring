import { DataSource } from 'typeorm';
import { IVicidialCoreRepository } from '@feat/crMaster/domain/interface/IVicidialCoreRepository';
import { FRVicidialList1121 } from '@shared/domain/entities/CRMaster';

export default class VicidialCore11Repository implements IVicidialCoreRepository {
  constructor(private orm: DataSource) {}

  public async getInfo(listId: number): Promise<FRVicidialList1121[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.getRepository(FRVicidialList1121);
    const result = await repository.find({
      where: {
        listId,
      },
    });
    orm.destroy();
    return result;
  }
}
