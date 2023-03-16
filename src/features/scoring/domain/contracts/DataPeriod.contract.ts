import { Bitel, Claro, Entel, Movistar } from '@shared/domain/entities/Infocall';
import { ManagementHistoryContract } from './ManagementHistory.contract';

export interface DataPeriodContract {
  info: ManagementHistoryContract;
  operator: Bitel | Claro | Entel | Movistar;
}
