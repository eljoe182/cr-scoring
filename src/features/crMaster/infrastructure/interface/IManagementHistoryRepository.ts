import { FilterManagementHistory } from '@feat/crMaster/domain/class/FilterManagementHistory';
import { ManagementHistory } from '@shared/domain/entities/CRMaster/FRManagmentHistory.entity';

export interface IManagementHistoryRepository {
  getManagementHistory(params: FilterManagementHistory): Promise<ManagementHistory[]>;
}
