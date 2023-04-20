import { GetInfoVicidialUseCaseResponse } from 'src/features/crMaster/domain/contracts';
import { IBaseUseCase } from 'src/shared/domain';
import RankNumbers from '../domain/class/RankNumbers';
import ScoringData from '../domain/class/ScoringData';
import { ResultScoringParams } from '../domain/contracts';
import { ResultScoringResponse } from '../domain/contracts/IResultScoringResults';

export default class ResultScoringUseCase implements IBaseUseCase {
  constructor(
    private getInfoVicidialUseCase: IBaseUseCase<ResultScoringParams, GetInfoVicidialUseCaseResponse[]>,
    private getScoringBulkUseCase: IBaseUseCase<number[], ScoringData[]>
  ) {}

  async execute(params: ResultScoringParams): Promise<unknown> {
    const vicidialData = await this.getInfoVicidialUseCase.execute(params);

    const phoneNumbers = vicidialData
      .filter((item) => item.phoneNumber.toString().length === 9)
      .map((item) => Number(item.phoneNumber));
    const uniquePhoneNumbers = [...new Set(phoneNumbers)];

    const bulkData = await this.getScoringBulkUseCase.execute(uniquePhoneNumbers);

    const scoringData = bulkData.map((item) => new ScoringData(item).toPrimitive());

    const data = vicidialData.map((item): ResultScoringResponse => {
      const scoringItem = scoringData.find((scoringItem) => scoringItem.phoneNumber === item.phoneNumber);

      return {
        leadId: item.leadId,
        listId: item.listId,
        phoneNumber: item.phoneNumber,
        sourceId: item.sourceId,
        vendorLeadCode: item.vendorLeadCode,
        operator: scoringItem?.operator || 'SIN VALIDAR',
        score: scoringItem?.score || 0,
        beastDate: scoringItem?.beastDate || new Date(1),
        betterManagement: scoringItem?.betterManagement || '-',
        beastTry: scoringItem?.beastTry || '-',
        withWhatsapp: scoringItem?.withWhatsapp || false,
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

    const dataRanked = new RankNumbers(sortedData).getRank();

    return dataRanked;
  }
}
