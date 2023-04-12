import { Bitel, Claro, Entel, Movistar } from '../../../../shared/infrastructure/persistance/entities';
import { ManagementHistoryContract } from './ManagementHistory.contract';

export interface DataPeriodContract {
  info: ManagementHistoryContract;
  operator: Bitel | Claro | Entel | Movistar;
}
