import { FilterManagementHistory } from '@feat/crMaster/domain/class/FilterManagementHistory';
import { IManagementHistoryResult } from '../../domain/interface/IManagementHistoryResult';

export interface IManagementHistoryRepository {
  getManagementHistory(params: FilterManagementHistory): Promise<IManagementHistoryResult[]>;
}
