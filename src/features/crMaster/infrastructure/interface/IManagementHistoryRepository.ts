import { FilterManagementHistory } from '../../../../features/crMaster/domain/class/FilterManagementHistory';
import { IManagementHistoryResult } from '../../domain/interface/IManagementHistoryResult';

export interface IManagementHistoryRepository {
  getManagementHistory(params: FilterManagementHistory): Promise<IManagementHistoryResult[]>;
}
