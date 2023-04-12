import { DataSourceDependency as dsContainer } from '../../../app/dependencyInjection';
import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { IManagementHistoryRepository } from '../infrastructure/interface/IManagementHistoryRepository';
import { FilterManagementHistory } from '../domain/class/FilterManagementHistory';
import DateFormat from '../../../shared/data-values/DateFormat';
import { ParamsNumberEvaluationContract } from '../../../features/scoring/domain/contracts/NumberEvaluation.contract';
import { DataPeriodContract } from '../../../features/scoring/domain/contracts/DataPeriod.contract';
import { HistoryResultContract } from '../domain/contracts/HistoryResultContract';
import { SettingsFieldsContract } from '../../../features/settingFields/domain/contracts/SettingsFields.contract';
import { IResultPagination } from '../../../features/scoring/domain/interface/IResultPagination';
// import StringToHash from '../../../shared/data-values/StringToHash';

export default class GetHistoryUseCase implements IBaseUseCase {
  private redisRepository = dsContainer.get('DataSource.Redis.Repository');
  constructor(
    private repository: IManagementHistoryRepository,
    private setOperatorUseCase: IBaseUseCase,
    private numberEvaluationUseCase: IBaseUseCase,
    private settingsFieldsUseCase: IBaseUseCase
  ) {}

  async execute(params: FilterManagementHistory): Promise<unknown> {
    // const hash = StringToHash.hash(`${JSON.stringify(params)}`);
    const campaignListId = await this.redisRepository.get(`${params.campaign}-${params.listId}`);

    let phoneOperators: DataPeriodContract[] = [];

    if (campaignListId) {
      phoneOperators = JSON.parse(campaignListId);
    } else {
      const managementHistory = await this.repository.getManagementHistory(params);

      if (managementHistory.length === 0) return null;

      const { success } = (await this.setOperatorUseCase.execute(managementHistory)) as {
        success: DataPeriodContract[];
        errors: string[];
      };
      await this.redisRepository.set(`${params.campaign}-${params.listId}`, JSON.stringify(success));

      phoneOperators = success;
    }

    const settingsFields = (await this.settingsFieldsUseCase.execute({
      campaign: params.campaign,
    })) as unknown as Promise<IResultPagination>;

    const numbersTest = phoneOperators.filter((item) => item.operator.subscription);

    const resultEvaluation = await Promise.allSettled(
      numbersTest.map(async (data) => {
        const information: ParamsNumberEvaluationContract = {
          dataPeriod: data,
          fields: (await settingsFields).rows as SettingsFieldsContract[],
        };
        const evaluation = (await this.numberEvaluationUseCase.execute(information)) as {
          phoneNumber: string;
          score: number;
          betterManagement: string;
          beastTry: string;
        };

        return { ...data, ...evaluation };
      })
    ).then((results) => {
      const success: HistoryResultContract[] = [];
      const errors: string[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          success.push({
            phoneNumber: result.value.info.phoneNumber,
            score: result.value.score,
            operator: result.value.operator.operator.toUpperCase(),
            beastDate: result.value.operator.updatedAt
              ? DateFormat.date(result.value.operator.updatedAt)
              : DateFormat.date(new Date(0)),
            betterManagement: result.value.betterManagement,
            beastTry: result.value.beastTry,
            moreThanOne: Boolean(Number(result.value.operator.moreThanOne)),
            withWhatsapp: Boolean(result.value.operator.withWhatsapp),
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

    // await this.redisRepository.set(hash, JSON.stringify(resultEvaluation));

    return resultEvaluation;
  }
}
