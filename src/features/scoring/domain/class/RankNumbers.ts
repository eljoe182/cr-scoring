import { ScoringRules } from 'src/shared/infrastructure/persistance/entities';
import { ResultScoringResponse } from '../contracts/IResultScoringResults';

type Rules = Pick<ScoringRules, 'score1' | 'score2' | 'score3' | 'score4' | 'score5'>

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

  getRank(rules: Rules) {
    const leadCodes = this.getLeadCode();

    // sort vicidial data by leadId and vendorLeadCode
    this.sortLeadId();

    const newData = leadCodes
      .map((lead) => {
        const phoneNumbers = this.findLeadPhoneNumbers(lead);

        // unique phone numbers with scores
        const uniquePhoneNumbers = this.uniquePhoneNumbers(phoneNumbers);

        // sort unique phone numbers by score
        if (uniquePhoneNumbers.length > 1) {
          uniquePhoneNumbers.sort((a, b) => {
            if (!a?.score?.toString() || !b?.score?.toString()) return 0;
            return b.score - a.score;
          });
        }

        // assign rank to unique phone numbers
        return uniquePhoneNumbers.map((item) => {
          if (item?.score) {
            if (item.score >= rules.score1.min && item.score <= rules.score1.max) {
              return {
                ...item,
                rank: 1,
              };
            }
            if (item.score >= rules.score2.min && item.score <= rules.score2.max) {
              return {
                ...item,
                rank: 2,
              };
            }
            if (item.score >= rules.score3.min && item.score <= rules.score3.max) {
              return {
                ...item,
                rank: 3,
              };
            }
            if (item.score >= rules.score4.min && item.score <= rules.score4.max) {
              return {
                ...item,
                rank: 4,
              };
            }
            if (item.score >= rules.score5.min && item.score <= rules.score5.max) {
              return {
                ...item,
                rank: 5,
              };
            }
          }
          return {
            ...item,
            rank: 0,
          };
        });
      })
      .flat();

      // sort data by rank
      newData.sort((a, b) => {
        if (a.rank && b.rank) {
          return a.rank - b.rank;
        }
        return 0;
      });

    return newData;
  }
}
