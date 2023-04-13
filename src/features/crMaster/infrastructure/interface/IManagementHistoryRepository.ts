import { FilterManagementHistory } from '../../domain/contracts';
import { IManagementHistoryResult } from '../../domain/interface';

export interface IManagementHistoryRepository {
  getManagementHistory(params: FilterManagementHistory): Promise<IManagementHistoryResult[]>;
}
