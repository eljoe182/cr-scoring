import { IOperatorEntityBase } from 'src/shared/infrastructure/interfaces/IOperatorEntityBase';
import { ManagementHistoryData } from '../contracts/ManagementHistory.contract';

export interface IManagementHistoryDataRepository {
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

export type GetManagementHistoryUseCaseResult = ManagementHistoryData & {
  operator: IOperatorEntityBase;
};
