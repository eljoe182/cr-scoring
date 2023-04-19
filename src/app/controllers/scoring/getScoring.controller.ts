import { Request, Response, NextFunction } from 'express';
import {
  GetManagementHistoryUseCaseParams,
  GetManagementHistoryUseCaseResult,
} from 'src/features/crMaster/domain/interface';
import SetNumberEvaluationUseCase from 'src/features/scoring/application/SetNumberEvaluation.useCase';
import { GetScoringParams } from 'src/features/scoring/domain/contracts';
import { SetNumberEvaluationUseCaseResult } from 'src/features/scoring/domain/contracts/INumberEvaluationResults';
import { IResultPagination } from 'src/features/scoring/domain/interface';
import { GetSettingsFieldsUseCaseParams } from 'src/features/settingFields/domain/interface/ISettingsFieldsParams';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';

export default class GetScoringController implements IBaseController {
  constructor(
    private readonly managementHistoryUseCase: IBaseUseCase<GetManagementHistoryUseCaseParams>,
    private readonly getSettingsFieldsUseCase: IBaseUseCase<GetSettingsFieldsUseCaseParams>
  ) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const body = req.body as GetScoringParams;
    const managementHistory = (await this.managementHistoryUseCase.execute(
      body
    )) as unknown as GetManagementHistoryUseCaseResult[];
    if (!managementHistory) {
      res.status(404).json({ message: 'Numbers not founds' });
      return;
    }

    const settingsFields = (await this.getSettingsFieldsUseCase.execute({
      campaign: body.campaign,
      limit: 100,
      page: 1,
    })) as unknown as IResultPagination<SettingsFields[]>;

    const resultEvaluation = managementHistory.map((item) => {
      const result = SetNumberEvaluationUseCase.execute({
        data: item,
        fields: settingsFields.rows,
      }) as SetNumberEvaluationUseCaseResult;
      return result;
    });
    res.status(200).json(resultEvaluation);
  }
}
