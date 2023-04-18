import { IManagementHistoryDataRepository } from '../interface/IManagementHistoryResult';

export class ManagementHistory {
  constructor(private readonly data: IManagementHistoryDataRepository[]) {}
  toPrimitive() {
    return this.data.map((item: IManagementHistoryDataRepository) => {
      return {
        phoneNumber: Number(item.phoneNumber),
        length: item.length,
        talkTime: item.talkTime,
        betterAttempt: item.betterAttempt.toLowerCase(),
        betterAttemptValue: item.betterAttemptValue,
        totalManagement: item.totalManagement,
        wrong: item.wrong,
        deceased: item.deceased,
        CD: item.CD,
        CNE: item.CNE,
        NC: item.NC,
        betterManagement: item.betterManagement,
        betterManagementDate: item.betterManagementDate,
      };
    });
  }
}
