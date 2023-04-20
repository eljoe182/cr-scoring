import { ResultScoringResponse } from '../contracts/IResultScoringResults';

export default class RankNumbers {
  constructor(private readonly data: ResultScoringResponse[]) {}

  private getLeadCode() {
    return [...new Set(this.data.map((item) => item.vendorLeadCode))];
  }

  private sortLeadId() {
    this.data.sort((a, b) => {
      if (a.leadId && b.leadId) {
        return b.leadId - a.leadId;
      }
      return 0;
    });
  }

  private findLeadPhoneNumbers(lead: string) {
    return this.data
      .filter((item) => item.vendorLeadCode === lead)
      .map((item) => ({
        phoneNumber: item.phoneNumber,
      }));
  }

  private uniquePhoneNumbers(phoneNumbers: { phoneNumber: number }[]) {
    return [...new Set(phoneNumbers.map((item) => item.phoneNumber))].map((phoneNumber) => {
      return this.data.find((item) => item.phoneNumber === phoneNumber);
    });
  }

  getRank() {
    const leadCodes = this.getLeadCode();

    // sort vicidial data by leadId and vendorLeadCode
    this.sortLeadId();

    const newData = leadCodes
      .map((lead) => {
        const phoneNumbers = this.findLeadPhoneNumbers(lead);

        // unique phone numbers with scores
        const uniquePhoneNumbers = this.uniquePhoneNumbers(phoneNumbers);

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
      })
      .flat();

    return newData;
  }
}
