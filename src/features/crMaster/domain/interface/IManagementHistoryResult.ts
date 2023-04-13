export interface IManagementHistoryResult {
  phoneNumber: string;
  length: number;
  talkTime: number;
  betterAttempt: string;
  betterAttemptValue: number;
  totalManagement: number;
  wrong: number;
  deceased: number;
  CD: number;
  CNE: number;
  NC: number;
  betterManagement: string;
  betterManagementDate: string | null;
}
