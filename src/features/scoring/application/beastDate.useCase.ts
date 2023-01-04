import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { DataPeriodContract } from '../domain/contracts/DataPeriod.contract';

export default class BeastDateUseCase implements IBaseUseCase {
  execute(params: DataPeriodContract): Promise<unknown> {
    return new Promise((resolve) => {
      const { bitelCreated, claroCreated, entelCreated, movistarCreated, phoneNumber } = params;

      const dates = [bitelCreated, claroCreated, entelCreated, movistarCreated];

      const lastDate = (dates.reduce((a, b) => (a > b ? a : b)) as Date) || new Date(0);

      resolve({
        phoneNumber,
        lastDate,
      });
    });
  }
}
