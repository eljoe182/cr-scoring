import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { ParamsNumberEvaluationContract } from '../domain/contracts/NumberEvaluation.contract';

export default class NumberEvaluationUseCase implements IBaseUseCase {
  async execute(params: ParamsNumberEvaluationContract): Promise<unknown> {
    return new Promise((resolve) => {

      let score = params.dataPeriod.info.betterAttemptValue

      if (params.dataPeriod.info.betterManagement === 'CD') {
        score = score + 1;
      }

      if(params.dataPeriod.operator.withWhatsapp) {
        score = score + 1;
      }

      resolve({
        phoneNumber: params.dataPeriod.info.phoneNumber,
        score,
        betterManagement: params.dataPeriod.info.betterManagement,
        beastTry: 0,
        withWhatsapp: params.dataPeriod.operator.withWhatsapp,
      });
    });
  }
}
