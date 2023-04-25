import { GetManagementHistoryUseCaseResult } from 'src/features/crMaster/domain/interface';
import { ResultInfoCall } from './ResultInfoCall';

export interface SetNumberEvaluationUseCaseParams {
  data: GetManagementHistoryUseCaseResult;
  fields: ResultInfoCall[];
}
