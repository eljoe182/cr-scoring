import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IBitelRepository } from '../infrastructure/interface/IBitelRepository';
import { IClaroRepository } from '../infrastructure/interface/IClaroRepository';
import { IEntelRepository } from '../infrastructure/interface/IEntelRepository';
import { IMovistarRepository } from '../infrastructure/interface/IMovistarRepository';
import { IManagementHistoryResult } from '@feat/crMaster/domain/interface/IManagementHistoryResult';
import { DataPeriodContract } from '@feat/scoring/domain/contracts/DataPeriod.contract';

export default class SetOperatorUseCase implements IBaseUseCase {
  constructor(
    private readonly repositoryBitel: IBitelRepository,
    private readonly repositoryClaro: IClaroRepository,
    private readonly repositoryEntel: IEntelRepository,
    private readonly repositoryMovistar: IMovistarRepository
  ) {}

  async execute(data: IManagementHistoryResult[]): Promise<unknown> {
    const phoneNumbers = data.filter((item) => item.phoneNumber.length === 9).map((info) => Number(info.phoneNumber));

    const uniquePhoneNumbers = [...new Set(phoneNumbers)];

    const bitelNumbers = await this.repositoryBitel.getInByPhoneNumber(uniquePhoneNumbers);
    const claroNumbers = await this.repositoryClaro.getInByPhoneNumber(uniquePhoneNumbers);
    const entelNumbers = await this.repositoryEntel.getInByPhoneNumber(uniquePhoneNumbers);
    const movistarNumbers = await this.repositoryMovistar.getInByPhoneNumber(uniquePhoneNumbers);

    const numbersValid = [...bitelNumbers, ...claroNumbers, ...entelNumbers, ...movistarNumbers].filter(
      (item) => item.phoneNumber.toString().length === 9
    );

    return Promise.allSettled(
      data.map((info) => {
        const phoneNumber = Number(info.phoneNumber);

        if (isNaN(phoneNumber) || phoneNumber === 0) {
          return Promise.reject('Phone number is not valid');
        }

        const operator = numbersValid.filter((number) => number.phoneNumber === phoneNumber);

        if (operator.length === 0) {
          return Promise.reject(`The phone number ${phoneNumber} does not have an operator`);
        }

        if (operator.length > 1) {
          const bestRow = operator.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
          bestRow.moreThanOne = true;
          return Promise.resolve({
            info,
            operator: bestRow,
          });
        }

        return Promise.resolve({
          info,
          operator: operator[0],
        });
      })
    ).then((results) => {
      const success: DataPeriodContract[] = [];
      const errors: string[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          success.push(result.value);
        }
        if (result.status === 'rejected') {
          errors.push(result.reason);
        }
      });

      return {
        success,
        errors,
      };
    });
  }
}