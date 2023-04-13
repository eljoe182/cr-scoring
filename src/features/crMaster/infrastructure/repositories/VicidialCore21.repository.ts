import { DataSource } from 'typeorm';
import { IVicidialCoreRepository } from 'src/features/crMaster/infrastructure/interface';
import { FRVicidialList2121Entity } from 'src/shared/infrastructure/persistance/entities';

export default class VicidialCore21Repository implements IVicidialCoreRepository {
  constructor(private orm: DataSource) {}

  public async getInfo(listId: number): Promise<FRVicidialList2121Entity[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.getRepository(FRVicidialList2121Entity);
    const result = await repository.find({
      where: {
        listId,
      },
    });
    orm.destroy();
    return result;
  }
}
