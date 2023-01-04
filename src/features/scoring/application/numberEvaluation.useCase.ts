import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { ParamsNumberEvaluationContract } from '../domain/contracts/NumberEvaluation.contract';
import { Attempt } from '../domain/Attempt.enum';

export default class NumberEvaluationUseCase implements IBaseUseCase {
  async execute(params: ParamsNumberEvaluationContract): Promise<unknown> {
    return new Promise((resolve) => {
      let score = 0;

      const attemptValue = Attempt[params.dataPeriod.bestAttempt[0].toString().toUpperCase() as keyof typeof Attempt];

      if (attemptValue > 0) {
        score += attemptValue;
      }
      resolve({
        phoneNumber: params.dataPeriod.phoneNumber,
        score,
      });
    });
  }
}
