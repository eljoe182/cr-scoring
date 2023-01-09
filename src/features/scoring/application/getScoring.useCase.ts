import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { DataPeriodContract } from '../domain/contracts/DataPeriod.contract';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';
import { ParamsNumberEvaluationContract } from '../domain/contracts/NumberEvaluation.contract';
import { SettingsFieldsContract } from '../domain/contracts/SettingsFields.contract';
import container from '@app/dependencyInjection/shared';
import ILogger from '@shared/domain/ILogger';

export default class GetScoringUseCase implements IBaseUseCase {
  private logger: ILogger;
  constructor(
    private readonly retrievePeriodUseCase: IBaseUseCase,
    private readonly numberEvaluationUseCase: IBaseUseCase,
    private readonly settingsFieldsRepository: ISettingsFieldsRepository,
    private readonly beastDateUseCase: IBaseUseCase
  ) {
    this.logger = container.get('Logger');
  }

  async execute(period: string) {
    const dataPeriod = (await this.retrievePeriodUseCase.execute(period)) as DataPeriodContract[];
    const dataFields = (await (
      await this.settingsFieldsRepository.getSettingsFields()
    ).data) as SettingsFieldsContract[];

    const resultEvaluation = await Promise.allSettled(
      dataPeriod.map(async (data) => {
        const params: ParamsNumberEvaluationContract = { dataPeriod: data, fields: dataFields };
        const evaluation = (await this.numberEvaluationUseCase.execute(params)) as {
          phoneNumber: string;
          score: number;
        };
        this.logger.info(`${evaluation.phoneNumber} - ${evaluation.score}`);
        const beastDate = (await this.beastDateUseCase.execute(data)) as { phoneNumber: string; beastDate: Date };
        this.logger.info(`${beastDate.beastDate}`);
        return { ...evaluation, ...beastDate };
      })
    ).then((results) => {
      const success: unknown[] = [];
      const errors: unknown[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          success.push(result.value);
        }
        if (result.status === 'rejected') {
          errors.push(result.reason);
        }
      });

      return {
        success,
        errors,
      };
    });

    return {
      message: 'Scoring',
      data: resultEvaluation,
    };
  }
}
