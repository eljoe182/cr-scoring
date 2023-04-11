import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { IVicidialCoreRepository } from '../infrastructure/interface/IVicidialCoreRepository';
import { paramsVicidial } from '../../../features/infocall/domain/contracts/ResultScoringParamsContract';
import {
  ScoringEntity,
  FRVicidialListEntity,
  FRVicidialList1121Entity,
  FRVicidialList2121Entity,
} from '../../../shared/infrastructure/persistance/entities';
import { IScoringRepository } from '../../../features/scoring/infrastructure/interface/IScoringRepository';
import { DataSourceDependency as dsContainer } from '@app/dependencyInjection';

export default class GetInfoVicidialUseCase implements IBaseUseCase {
  private redisRepository = dsContainer.get('DataSource.Redis.Repository');
  constructor(
    private scoringRepository: IScoringRepository,
    private rankNumberIUseCase: IBaseUseCase,
    private vicidialCore1Repository: IVicidialCoreRepository,
    private vicidialCore11Repository: IVicidialCoreRepository,
    private vicidialCore21Repository: IVicidialCoreRepository
  ) {}

  public async execute(params: paramsVicidial): Promise<unknown | null> {
    let vicidialData: FRVicidialListEntity[] | FRVicidialList1121Entity[] | FRVicidialList2121Entity[] = [];
    const listId = Number(params.listId);

    const cache = await this.redisRepository.get(`${params.core}-${params.listId}`);
    if (cache) {
      vicidialData = JSON.parse(cache);
    } else {
      if (params.core === 'core1') {
        vicidialData = (await this.vicidialCore1Repository.getInfo(listId)) as FRVicidialListEntity[];
      }
      if (params.core === 'core11') {
        vicidialData = (await this.vicidialCore11Repository.getInfo(listId)) as FRVicidialList1121Entity[];
      }
      if (params.core === 'core21') {
        vicidialData = (await this.vicidialCore21Repository.getInfo(listId)) as FRVicidialList2121Entity[];
      }
      await this.redisRepository.set(`${params.core}-${params.listId}`, JSON.stringify(vicidialData));
    }

    if (!vicidialData) {
      return null;
    }

    const phoneNumbers = vicidialData.filter((item) => item.phoneNumber.length === 9).map((item) => item.phoneNumber);
    const uniquePhoneNumbers = [...new Set(phoneNumbers)];

    const scoringData = (await this.scoringRepository.getInByPhoneNumber(
      uniquePhoneNumbers
    )) as unknown as ScoringEntity[];

    const data = vicidialData.map((item) => {
      const scoringItem = scoringData.find((scoringItem) => scoringItem.phoneNumber === item.phoneNumber);

      return {
        leadId: item.leadId,
        listId: item.listId,
        phoneNumber: item.phoneNumber,
        sourceId: item.sourceId,
        vendorLeadCode: item.vendorLeadCode,
        operator: scoringItem?.operator || 'SIN VALIDAR',
        score: scoringItem?.score || 0,
        beastDate: scoringItem?.beastDate || new Date(0),
        betterManagement: scoringItem?.betterManagement || '-',
        beastTry: scoringItem?.beastTry || '-',
        withWhatsapp: scoringItem?.withWhatsapp || 0,
      };
    });

    // sort data by vendorLeadCode

    const sortedData = data.sort((a, b) => {
      if (a.vendorLeadCode < b.vendorLeadCode) {
        return -1;
      }
      if (a.vendorLeadCode > b.vendorLeadCode) {
        return 1;
      }
      return 0;
    });

    const dataRanked = await this.rankNumberIUseCase.execute(sortedData);

    return dataRanked;
  }
}
