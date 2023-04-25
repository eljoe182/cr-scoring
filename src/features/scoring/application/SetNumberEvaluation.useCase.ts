import { Databases } from '../domain/class/Databases.enum';
import { SetNumberEvaluationUseCaseParams } from '../domain/contracts/INumberEvaluationParams';
import { Evaluation } from '../domain/class/Evaluation';
import { IdentifyColumns } from '../domain/class/IdentifyColumns';
import { SetNumberEvaluationUseCaseResult } from '../domain/contracts/INumberEvaluationResults';

export class SetNumberEvaluationUseCase {
  static execute(params: SetNumberEvaluationUseCaseParams): SetNumberEvaluationUseCaseResult {
    let score = 0;
    const entriesOperator = Object.entries(params.data.operator);
    const entriesCrMaestra = Object.entries(params.data);

    // management operations
    const infoCallFields = params.fields?.filter((item) => item.database === Databases.INFOCALL);
    if (infoCallFields.length > 0) {
      const resultInfoCall = IdentifyColumns.getValues(infoCallFields);

      score = Evaluation.getScore({
        score,
        entries: entriesOperator,
        data: resultInfoCall,
        operator: params.data.operator.operator,
      });
    }

    // operator operations
    const crMasterFields = params.fields?.filter((item) => item.database === Databases.CR_MASTER);
    if (crMasterFields.length > 0) {
      const resultCrMaster = IdentifyColumns.getValues(crMasterFields);

      score = Evaluation.getScore({
        score,
        entries: entriesCrMaestra,
        data: resultCrMaster,
      });
    }

    return {
      ...params.data,
      score,
    };
  }
}
