import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { DataPeriodContract } from '../domain/contracts/DataPeriod.contract';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';
import { ParamsNumberEvaluationContract } from '../domain/contracts/NumberEvaluation.contract';
import { SettingsFieldsContract } from '../domain/contracts/SettingsFields.contract';

export default class GetScoringUseCase implements IBaseUseCase {
  constructor(
    private readonly retrievePeriodUseCase: IBaseUseCase,
    private readonly numberEvaluationUseCase: IBaseUseCase,
    private readonly settingsFieldsRepository: ISettingsFieldsRepository
  ) {}

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

        return { ...data, ...evaluation };
      })
    ).then((results) => {
      const success: unknown[] = [];
      const errors: unknown[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          success.push({
            phoneNumber: result.value.info.phoneNumber,
            score: result.value.score,
            operator: result.value.operator.operator,
            beastDate: result.value.operator.validataCreatedAt ?? new Date(0),
          });
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
      data: resultEvaluation.success,
    };
  }
}
