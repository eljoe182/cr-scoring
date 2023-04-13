import { DataPeriodContract } from '../../../scoring/domain/contracts';

export interface OperatorData {
  success: DataPeriodContract[];
  errors: string[];
}
