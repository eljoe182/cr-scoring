import { GetManagementHistoryUseCaseResult } from "src/features/crMaster/domain/interface";

export interface OperatorData {
  success: GetManagementHistoryUseCaseResult[];
  errors: string[];
}
