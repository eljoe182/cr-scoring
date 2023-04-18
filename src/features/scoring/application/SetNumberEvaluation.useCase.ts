import { Databases } from '../domain/class/Databases.enum';
import { SetNumberEvaluationUseCaseParams } from '../domain/contracts/INumberEvaluationParams';
import { Evaluation } from '../domain/class/Evaluation';
import { IdentifyColumns } from '../domain/class/IdentifyColumns';
import { SetNumberEvaluationUseCaseResult } from '../domain/contracts/INumberEvaluationResults';

export default class SetNumberEvaluationUseCase {
  static execute(params: SetNumberEvaluationUseCaseParams): SetNumberEvaluationUseCaseResult {
    let score = 0;
    const entriesOperator = Object.entries(params.data.operator);
    const entriesCrMaestra = Object.entries(params.data);

    const infoCallFields = params.fields?.filter((item) => item.database === Databases.INFOCALL);
    // management operations

    const resultInfoCall = IdentifyColumns.getValues(infoCallFields);

    score = Evaluation.getScore({
      score,
      entries: entriesOperator,
      data: resultInfoCall,
    });

    // operator operations
    const crMasterFields = params.fields?.filter((item) => item.database === Databases.CR_MASTER);

    const resultCrMaster = IdentifyColumns.getValues(crMasterFields);

    score = Evaluation.getScore({
      score,
      entries: entriesCrMaestra,
      data: resultCrMaster,
    });

    return {
      ...params.data,
      score,
    };
  }
}
