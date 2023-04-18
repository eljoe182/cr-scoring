import { GetManagementHistoryUseCaseResult } from 'src/features/crMaster/domain/interface';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';

export interface SetNumberEvaluationUseCaseParams {
  data: GetManagementHistoryUseCaseResult;
  fields: SettingsFields[];
}
