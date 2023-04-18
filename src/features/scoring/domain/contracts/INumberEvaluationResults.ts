import { GetManagementHistoryUseCaseResult } from 'src/features/crMaster/domain/interface';

export interface SetNumberEvaluationUseCaseResult extends GetManagementHistoryUseCaseResult {
  score: number;
}
