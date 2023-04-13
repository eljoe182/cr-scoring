import { DataSource } from 'typeorm';
import { FilterManagementHistory } from '../../domain/contracts';
import { IManagementHistoryRepository } from '../interface';
import { IManagementHistoryResult } from '../../domain/interface';

export default class ManagementHistoryRepository implements IManagementHistoryRepository {
  constructor(private orm: DataSource) {}

  public async getManagementHistory(params: FilterManagementHistory): Promise<IManagementHistoryResult[]> {
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
