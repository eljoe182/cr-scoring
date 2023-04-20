import { IBaseUseCase } from 'src/shared/domain';
import { GetScoringParams } from '../domain/contracts/IGetScoringParams';
import {
  GetManagementHistoryUseCaseParams,
  GetManagementHistoryUseCaseResult,
} from 'src/features/crMaster/domain/interface';
import { GetSettingsFieldsUseCaseParams } from 'src/features/settingFields/domain/interface/ISettingsFieldsParams';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';
import { SetNumberEvaluationUseCaseResult } from '../domain/contracts/INumberEvaluationResults';
import SetNumberEvaluationUseCase from './SetNumberEvaluation.useCase';
import { IResultPagination } from 'src/shared/infrastructure/interfaces';

export default class GetScoringUseCase implements IBaseUseCase {
  constructor(
    private readonly managementHistoryUseCase: IBaseUseCase<
      GetManagementHistoryUseCaseParams,
      GetManagementHistoryUseCaseResult[]
    >,
    private readonly getSettingsFieldsUseCase: IBaseUseCase<
      GetSettingsFieldsUseCaseParams,
      IResultPagination<SettingsFields[]>
    >
  ) {}

  async execute(params: GetScoringParams) {
    const managementHistory = await this.managementHistoryUseCase.execute(params);
    if (!managementHistory) {
      return [];
    }

    const settingsFields = await this.getSettingsFieldsUseCase.execute({
      campaign: params.campaign,
      size: 100,
      page: 1,
    });

    const resultEvaluation = managementHistory.map((item) => {
      const result = SetNumberEvaluationUseCase.execute({
        data: item,
        fields: settingsFields.rows,
      }) as SetNumberEvaluationUseCaseResult;
      return result;
    });

    return resultEvaluation;
  }
}
