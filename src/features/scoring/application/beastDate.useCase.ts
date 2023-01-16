import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { DataPeriodContract } from '../domain/contracts/DataPeriod.contract';
// import DateFormat from '@shared/data-values/DateFormat';

export default class BeastDateUseCase implements IBaseUseCase {
  execute(params: DataPeriodContract): Promise<unknown> {
    return new Promise((resolve) => {
      const { info, operator } = params;

      // const dates = [bitelCreated, claroCreated, entelCreated, movistarCreated];

      // const beastDate = (dates.reduce((a, b) => (a > b ? a : b)) as Date) || new Date(0);

      // const dateFormatted = DateFormat.date(beastDate);

      resolve({
        phoneNumber: info.phoneNumber,
        operator,
        beastDate: null,
      });
    });
  }
}
