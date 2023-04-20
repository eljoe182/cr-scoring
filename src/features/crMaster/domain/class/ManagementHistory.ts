import { IManagementHistoryDataRepository } from '../interface/IManagementHistoryResult';

export class ManagementHistory {
  constructor(private readonly data: IManagementHistoryDataRepository) {}
  toPrimitive() {
    return {
      phoneNumber: Number(this.data.phoneNumber),
      length: this.data.length,
      talkTime: this.data.talkTime,
      betterAttempt: this.data.betterAttempt.toLowerCase(),
      betterAttemptValue: this.data.betterAttemptValue,
      totalManagement: this.data.totalManagement,
      wrong: this.data.wrong,
      deceased: this.data.deceased,
      CD: this.data.CD,
      CNE: this.data.CNE,
      NC: this.data.NC,
      betterManagement: this.data.betterManagement,
      betterManagementDate: this.data.betterManagementDate,
    };
  }
}
