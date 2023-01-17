import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IBitelRepository } from '@feat/infocall/infrastructure/interface/IBitelRepository';
import { IClaroRepository } from '@feat/infocall/infrastructure/interface/IClaroRepository';
import { IEntelRepository } from '@feat/infocall/infrastructure/interface/IEntelRepository';
import { IMovistarRepository } from '@feat/infocall/infrastructure/interface/IMovistarRepository';
import { IResumenfonoRepository } from '@feat/crMaster/domain/interface/IResumenfonoRepository';
import { DataPeriodContract } from '../domain/contracts/DataPeriod.contract';

export default class RetrieveDataPeriodUseCase implements IBaseUseCase {
  constructor(
    private readonly repositoryResumenfono: IResumenfonoRepository,
    private readonly repositoryBitel: IBitelRepository,
    private readonly repositoryClaro: IClaroRepository,
    private readonly repositoryEntel: IEntelRepository,
    private readonly repositoryMovistar: IMovistarRepository
  ) {}

  async execute(period: string): Promise<DataPeriodContract[]> {
    const resumenfonoPeriod = await this.repositoryResumenfono.getByPeriod(period);

    const phoneNumbers = resumenfonoPeriod.map((info) => Number(info.phoneNumber));

    const bitelNumbers = await this.repositoryBitel.getInByPhoneNumber(phoneNumbers);
    const claroNumbers = await this.repositoryClaro.getInByPhoneNumber(phoneNumbers);
    const entelNumbers = await this.repositoryEntel.getInByPhoneNumber(phoneNumbers);
    const movistarNumbers = await this.repositoryMovistar.getInByPhoneNumber(phoneNumbers);

    const numbersValid = [...bitelNumbers, ...claroNumbers, ...entelNumbers, ...movistarNumbers];

    const resultPeriod = await Promise.allSettled(
      resumenfonoPeriod.map((info) => {
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
      const errors: unknown[] = [];

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

    return resultPeriod.success;
  }
}
