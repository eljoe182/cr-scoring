import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';
import { Bitel, Claro, Entel, Movistar } from '@shared/domain/entities/Infocall';
import { AttemptContract } from '../contracts/Attempts.contract';
import { Attempt } from './Attempt';
import { DataPeriodContract } from '../contracts/DataPeriod.contract';

export class DataPeriod {
  constructor(
    private readonly info: Resumenfono,
    private readonly bitel: Bitel,
    private readonly claro: Claro,
    private readonly entel: Entel,
    private readonly movistar: Movistar
  ) {}

  public transform(): DataPeriodContract {
    const beastAttempt: AttemptContract = {
      value: this.info.valueAttempt,
      regular: this.info.regularAttempt,
      alert: this.info.alertAttempt,
      invalid: this.info.invalidAttempt,
      intermediate: this.info.intermediateStates,
    };

    const bitel = this.bitel ?? {};
    const claro = this.claro ?? {};
    const entel = this.entel ?? {};
    const movistar = this.movistar ?? {};

    const operator = [bitel, claro, entel, movistar].reduce((a, b) =>
      Object.keys(a).length > Object.keys(b).length ? a : b
    );

    const attempt = new Attempt(beastAttempt);
    const bitelCreated = bitel?.validataCreatedAt;
    const claroCreated = claro?.validataCreatedAt;
    const entelCreated = entel?.validataCreatedAt;
    const movistarCreated = movistar?.validataCreatedAt;
    const bestAttempt = attempt.getBestAttempt();

    return {
      phoneNumber: this.info.phoneNumber,
      operator: operator?.operator ?? 'No encontrado',
      bestAttempt,
      bitelCreated,
      claroCreated,
      entelCreated,
      movistarCreated,
    };
  }
}
