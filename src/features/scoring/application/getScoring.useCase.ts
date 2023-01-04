import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { DataPeriodContract } from '../domain/contracts/DataPeriod.contract';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';
import { ParamsNumberEvaluationContract } from '../domain/contracts/NumberEvaluation.contract';
import { SettingsFieldsContract } from '../domain/contracts/SettingsFields.contract';

export default class GetScoringUseCase implements IBaseUseCase {
  constructor(
    private readonly retrievePeriodUseCase: IBaseUseCase,
    private readonly numberEvaluationUseCase: IBaseUseCase,
    private readonly settingsFieldsRepository: ISettingsFieldsRepository,
    private readonly beastDateUseCase: IBaseUseCase
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
        const beastDate = (await this.beastDateUseCase.execute(data)) as { phoneNumber: string; lastDate: Date };
        return { ...evaluation, ...beastDate };
      })
    ).then((results) => {
      const success: unknown[] = [];

      results.map((result) => {
        if (result.status === 'fulfilled') {
          success.push(result.value);
        }
      });

      return success;
    });

    return {
      message: 'Scoring',
      data: resultEvaluation,
    };
  }
}
