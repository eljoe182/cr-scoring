import { DataSource } from 'typeorm';
import { GetManagementHistoryRepositoryParams, IManagementHistoryRepository } from '../interface';
import { IManagementHistoryDataRepository } from '../../domain/interface';

export default class ManagementHistoryRepository implements IManagementHistoryRepository<IManagementHistoryDataRepository> {
  constructor(private orm: DataSource) {}

  async getManagementHistory(params: GetManagementHistoryRepositoryParams): Promise<IManagementHistoryDataRepository[]> {
    const orm = await this.orm.initialize();
    const result = await orm.query('exec sp_management_history_for_scoring @0, @1, @2, @3', [
      params.dateFrom,
      params.dateTo,
      params.listId,
      params.campaign,
    ]);
    orm.destroy();
    return result;
  }
}
