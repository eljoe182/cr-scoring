import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IManagementHistoryRepository } from '../infrastructure/interface/IManagementHistoryRepository';
import { FilterManagementHistory } from '../domain/class/FilterManagementHistory';
import DateFormat from '@shared/data-values/DateFormat';
import { ParamsNumberEvaluationContract } from '@feat/scoring/domain/contracts/NumberEvaluation.contract';
import { DataPeriodContract } from '@feat/scoring/domain/contracts/DataPeriod.contract';
import { HistoryResultContract } from '../domain/contracts/HistoryResultContract';
import container from '@shared/infrastructure/dependency';
import StringToHash from '@shared/data-values/StringToHash';

export default class GetHistoryUseCase implements IBaseUseCase {
  private redisRepository = container.get('DataSource.Redis.Repository');
  private pagination = container.get('Utils.Pagination');
  constructor(
    private repository: IManagementHistoryRepository,
    private setOperatorUseCase: IBaseUseCase,
    private numberEvaluationUseCase: IBaseUseCase
  ) {}

  async execute(params: FilterManagementHistory): Promise<unknown> {
    const hash = StringToHash.hash(`${JSON.stringify(params)}`);
    const cache = await this.redisRepository.get(hash);
    if (cache) {
      const data = JSON.parse(cache);
      return this.pagination.getPaginatedItems(data.success, 1, data.success.length);
    }

    const managementHistory = await this.repository.getManagementHistory(params);

    if(managementHistory.length === 0) {
      return null;
    }

    const { success } = (await this.setOperatorUseCase.execute(managementHistory)) as {
      success: DataPeriodContract[];
      errors: string[];
    };

    const resultEvaluation = await Promise.allSettled(
      success.map(async (data) => {
        const information: ParamsNumberEvaluationContract = { dataPeriod: data };
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

    await this.redisRepository.set(hash, JSON.stringify(resultEvaluation));

    return resultEvaluation;
  }
}
