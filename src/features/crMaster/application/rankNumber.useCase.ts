import { IBaseUseCase } from 'src/shared/domain';
import { GetInfoVicidialDataContract } from '../domain/contracts';

export default class RankNumberUseCase implements IBaseUseCase {
  public async execute(vicidialData: GetInfoVicidialDataContract[]): Promise<unknown> {
    const leadCode = [...new Set(vicidialData.map((item) => item.vendorLeadCode))];

    // sort vicidial data by leadId and vendorLeadCode
    vicidialData.sort((a, b) => {
      if (a.leadId && b.leadId) {
        return b.leadId - a.leadId;
      }
      return 0;
    });

    const newData = leadCode.map((lead) => {
      const phoneNumbers = vicidialData
        .filter((item) => item.vendorLeadCode === lead)
        .map((item) => ({
          phoneNumber: item.phoneNumber,
        }));

      // unique phone numbers with scores
      const uniquePhoneNumbers = [...new Set(phoneNumbers.map((item) => item.phoneNumber))].map((phoneNumber) => {
        return vicidialData.find((item) => item.phoneNumber === phoneNumber);
      });

      if (uniquePhoneNumbers.length > 1) {
        uniquePhoneNumbers.sort((a, b) => {
          if (!a?.score?.toString() || !b?.score?.toString()) return 0;
          return b.score - a.score;
        });
      }

      return uniquePhoneNumbers.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
    }).flat();

    return newData;
  }
}
