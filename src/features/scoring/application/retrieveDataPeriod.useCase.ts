import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IBitelRepository } from '@feat/infocall/infrastructure/interface/IBitelRepository';
import { IClaroRepository } from '@feat/infocall/infrastructure/interface/IClaroRepository';
import { IEntelRepository } from '@feat/infocall/infrastructure/interface/IEntelRepository';
import { IMovistarRepository } from '@feat/infocall/infrastructure/interface/IMovistarRepository';
import { DataPeriod } from '../domain/class/DataPeriod';
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

    const resultPeriod = await Promise.allSettled(
      resumenfonoPeriod.map(async (info) => {
        const phoneNumber = Number(info.phoneNumber);

        if (isNaN(phoneNumber) || phoneNumber === 0) {
          throw new Error('Phone number is not valid');
        }

        const bitel = await this.repositoryBitel.getByNumber(phoneNumber);
        const claro = await this.repositoryClaro.getByNumber(phoneNumber);
        const entel = await this.repositoryEntel.getByNumber(phoneNumber);
        const movistar = await this.repositoryMovistar.getByNumber(phoneNumber);

        return {
          info,
          bitel,
          claro,
          entel,
          movistar,
        };
      })
    ).then((results) => {
      const success: DataPeriodContract[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const data = new DataPeriod(
            result.value?.info,
            result.value?.bitel,
            result.value?.claro,
            result.value?.entel,
            result.value?.movistar
          ).transform();
          success.push(data);
        }
      });
      const error = results.map((result) => {
        if (result.status === 'rejected') {
          return result.reason;
        }
      });

      return {
        success,
        error,
      };
    });

    return resultPeriod.success;
  }
}
