import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IResumenfonoRepository } from '@feat/crMaster/domain/interface/IResumenfonoRepository';
import { IBitelRepository } from '@feat/infocall/infrastructure/interface/IBitelRepository';
import { IClaroRepository } from '@feat/infocall/infrastructure/interface/IClaroRepository';
import { IEntelRepository } from '@feat/infocall/infrastructure/interface/IEntelRepository';
import { IMovistarRepository } from '@feat/infocall/infrastructure/interface/IMovistarRepository';
import { Evaluation } from '../domain/class/Evaluation';

export default class GetScoringUseCase implements IBaseUseCase {
  constructor(
    private readonly repositoryResumenfono: IResumenfonoRepository,
    private readonly repositoryBitel: IBitelRepository,
    private readonly repositoryClaro: IClaroRepository,
    private readonly repositoryEntel: IEntelRepository,
    private readonly repositoryMovistar: IMovistarRepository
  ) {}

  async execute(period: string) {
    const resumenfonoPeriod = await this.repositoryResumenfono.getByPeriod(period);

    const resultPeriod = await Promise.allSettled(
      resumenfonoPeriod.map(async (info) => {
        const phoneNumber = Number(info.phoneNumber);
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
      const success = results.map((result) => {
        if (result.status === 'fulfilled') {
          return new Evaluation(
            result.value?.info,
            result.value?.bitel,
            result.value?.claro,
            result.value?.entel,
            result.value?.movistar
          ).getScore();
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

    return resultPeriod;
  }
}
