import { IBaseUseCase } from 'src/shared/domain/BaseUseCase';
import { DataSourceDependency as dsContainer } from 'src/app/dependencyInjection';
import { IManagementHistoryRepository } from '../infrastructure/interface';
import { OperatorData } from 'src/features/infocall/domain/contracts';
import { ManagementHistory } from '../domain/class/ManagementHistory';
import {
  IManagementHistoryDataRepository,
  GetManagementHistoryUseCaseParams,
  GetManagementHistoryUseCaseResult,
} from '../domain/interface';
import { SetOperatorsUseCaseParams } from 'src/features/infocall/domain/interface';

export default class GetHistoryHistoryUseCase implements IBaseUseCase<GetManagementHistoryUseCaseParams> {
  private redisRepository = dsContainer.get('DataSource.Redis.Repository');
  constructor(
    private repository: IManagementHistoryRepository<
      GetManagementHistoryUseCaseParams,
      IManagementHistoryDataRepository
    >,
    private setOperatorUseCase: IBaseUseCase<SetOperatorsUseCaseParams[], OperatorData>
  ) {}

  async execute(params: GetManagementHistoryUseCaseParams): Promise<GetManagementHistoryUseCaseResult[]> {
    const campaignListId = await this.redisRepository.get(`${params.campaign}-${params.listId}`);

    let phoneOperators: GetManagementHistoryUseCaseResult[] = [];

    if (campaignListId) {
      phoneOperators = JSON.parse(campaignListId);
    } else {
      const managementHistory = await this.repository.getManagementHistory(params);
      if (managementHistory.length === 0) return phoneOperators;

      const dataPrimitive = managementHistory.map((item) => new ManagementHistory(item).toPrimitive());

      const { success } = await this.setOperatorUseCase.execute(dataPrimitive);
      await this.redisRepository.set(`${params.campaign}-${params.listId}`, JSON.stringify(success));

      phoneOperators = success;
    }

    return phoneOperators;
  }
}
