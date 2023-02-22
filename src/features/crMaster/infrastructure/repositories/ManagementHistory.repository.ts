import { DataSource, Between } from 'typeorm';
import { ManagementHistory } from '@shared/domain/entities/CRMaster/FRManagmentHistory.entity';
import { IManagementHistoryRepository } from '../interface/IManagementHistoryRepository';
import { FilterManagementHistory } from '@feat/crMaster/domain/class/FilterManagementHistory';

export default class ManagementHistoryRepository implements IManagementHistoryRepository {
  constructor(private orm: DataSource) {}

  public async getManagementHistory(params: FilterManagementHistory): Promise<ManagementHistory[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ManagementHistory);
    const result = (await repository.find({
      where: {
        callDate: Between(params.dateFrom, params.dateTo),
        listId: params.listId,
      },
      take: 10,
    })) as unknown as ManagementHistory[];
    orm.destroy();
    return result;
  }
}
