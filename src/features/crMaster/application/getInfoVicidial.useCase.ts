import { IBaseUseCase } from 'src/shared/domain/BaseUseCase';
import { DataSourceDependency as dsContainer } from 'src/app/dependencyInjection';
import { IVicidialCoreRepository } from '../infrastructure/interface';
import { paramsVicidial } from 'src/features/infocall/domain/contracts';
import { FRVicidialList } from 'src/shared/infrastructure/persistance/entities';
import VicidialCore from '../domain/class/VicidialCore';

export default class GetInfoVicidialUseCase implements IBaseUseCase<paramsVicidial, FRVicidialList[]> {
  private redisRepository = dsContainer.get('DataSource.Redis.Repository');
  constructor(
    private vicidialCore1Repository: IVicidialCoreRepository<FRVicidialList>,
    private vicidialCore11Repository: IVicidialCoreRepository<FRVicidialList>,
    private vicidialCore21Repository: IVicidialCoreRepository<FRVicidialList>
  ) {}

  public async execute(params: paramsVicidial): Promise<FRVicidialList[]> {
    let vicidialData: FRVicidialList[] = [];
    const listId = Number(params.listId);

    const cache = await this.redisRepository.get(`${params.core}-${params.listId}`);
    if (cache) {
      vicidialData = JSON.parse(cache);
    } else {
      let dataRepository: FRVicidialList[] = [];
      if (params.core === 'core1') {
        dataRepository = await this.vicidialCore1Repository.getInfo(listId);
      }
      if (params.core === 'core11') {
        dataRepository = await this.vicidialCore11Repository.getInfo(listId);
      }
      if (params.core === 'core21') {
        dataRepository = await this.vicidialCore21Repository.getInfo(listId);
      }

      vicidialData = dataRepository.map((item) => new VicidialCore(item).toPrimitive());

      await this.redisRepository.set(`${params.core}-${params.listId}`, JSON.stringify(vicidialData));
    }

    return vicidialData;
  }
}
