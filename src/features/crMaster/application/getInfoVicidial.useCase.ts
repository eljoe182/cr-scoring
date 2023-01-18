import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IVicidialCoreRepository } from '../domain/interface/IVicidialCoreRepository';
import { paramsVicidial } from '@feat/infocall/domain/contracts/ResulScoringParamsContract';
import { FRVicidialList, FRVicidialList1121, FRVicidialList2121 } from '@shared/domain/entities/CRMaster';
import { GetInfoVicidialDataContract } from '../domain/contracts/GetInfoVicidialResponseContract';
import { IScoringRepository } from '@feat/scoring/infrastructure/interface/IScoringRepository';

export default class GetInfoVicidialUseCase implements IBaseUseCase {
  constructor(
    private scoringRepository: IScoringRepository,
    private vicidialCore1Repository: IVicidialCoreRepository,
    private vicidialCore11Repository: IVicidialCoreRepository,
    private vicidialCore21Repository: IVicidialCoreRepository
  ) {}

  public async execute(params: paramsVicidial): Promise<GetInfoVicidialDataContract[] | null> {
    let vicidialData: FRVicidialList[] | FRVicidialList1121[] | FRVicidialList2121[] = [];
    const listId = Number(params.listId);

    if (params.core === 'core1') {
      vicidialData = (await this.vicidialCore1Repository.getInfo(listId)) as FRVicidialList[];
    }
    if (params.core === 'core11') {
      vicidialData = (await this.vicidialCore11Repository.getInfo(listId)) as FRVicidialList1121[];
    }
    if (params.core === 'core21') {
      vicidialData = (await this.vicidialCore21Repository.getInfo(listId)) as FRVicidialList2121[];
    }
    if (!vicidialData) {
      return null;
    }

    const phoneNumbers = vicidialData.map((item) => item.phoneNumber);
    const scoringData = await this.scoringRepository.getInByPhoneNumber(phoneNumbers);

    const data = vicidialData.map((item) => {
      const scoringItem = scoringData.find((scoringItem) => scoringItem.phoneNumber === item.phoneNumber);

      return {
        leadId: item.leadId,
        listId: item.listId,
        phoneNumber: item.phoneNumber,
        sourceId: item.sourceId,
        vendorLeadCode: item.vendorLeadCode,
        operator: scoringItem?.operator || '',
        score: scoringItem?.score || 0,
        beastDate: scoringItem?.beastDate || new Date(0),
        betterManagement: scoringItem?.betterManagement || '',
        beastTry: scoringItem?.beastTry || '',
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

    return sortedData;
  }
}
