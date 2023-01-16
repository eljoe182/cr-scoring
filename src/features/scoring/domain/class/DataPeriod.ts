import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';
import { Bitel, Claro, Entel, Movistar } from '@shared/domain/entities/Infocall';
import { AttemptContract } from '../contracts/Attempts.contract';
import { Attempt } from './Attempt';
import { DataPeriodContract } from '../contracts/DataPeriod.contract';

export class DataPeriod {
  constructor(private readonly info: Resumenfono, private readonly operator: Bitel | Claro | Entel | Movistar) {}

  public transform(): DataPeriodContract {
    const beastAttempt: AttemptContract = {
      value: this.info.valueAttempt,
      regular: this.info.regularAttempt,
      alert: this.info.alertAttempt,
      invalid: this.info.invalidAttempt,
      intermediate: this.info.intermediateStates,
    };

    const attempt = new Attempt(beastAttempt);
    const bestAttempt = attempt.getBestAttempt();

    return {
      phoneNumber: this.info.phoneNumber,
      operator: this.operator.operator ?? 'No encontrado',
      bestAttempt,
    };
  }
}
