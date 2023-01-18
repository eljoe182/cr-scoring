import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { ParamsNumberEvaluationContract } from '../domain/contracts/NumberEvaluation.contract';
import { AttemptContract } from '../domain/contracts/Attempts.contract';
import { Attempt } from '../domain/class/Attempt';
import { AttemptENUM } from '../domain/Attempt.enum';

export default class NumberEvaluationUseCase implements IBaseUseCase {
  async execute(params: ParamsNumberEvaluationContract): Promise<unknown> {
    return new Promise((resolve) => {
      const beastAttempt: AttemptContract = {
        value: params.dataPeriod.info.valueAttempt,
        regular: params.dataPeriod.info.regularAttempt,
        alert: params.dataPeriod.info.alertAttempt,
        invalid: params.dataPeriod.info.invalidAttempt,
        intermediate: params.dataPeriod.info.intermediateStates,
      };

      const bestAttempt = Attempt.getBestAttempt(beastAttempt);
      let score = AttemptENUM[bestAttempt.toUpperCase() as keyof typeof AttemptENUM];

      if (params.dataPeriod.info.betterManagement === 'CD') {
        score = score + 1;
      }

      const beastTry = params.dataPeriod.info.beastTry.slice(2).toUpperCase();

      resolve({
        phoneNumber: params.dataPeriod.info.phoneNumber,
        score,
        betterManagement: params.dataPeriod.info.betterManagement,
        beastTry,
      });
    });
  }
}
