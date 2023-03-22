import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { paramsVicidial } from '@feat/infocall/domain/contracts/ResultScoringParamsContract';
import { IExportRepository } from '../infrastructure/interface/IExportRepository';
import { resultScoringDependency as container } from '@app/dependencyInjection';

export default class ExportToCSVUseCase implements IBaseUseCase {
  constructor(private readonly exportRepository: IExportRepository) {}

  async execute(resultScoring: paramsVicidial): Promise<unknown> {
    const { core, listId } = resultScoring;
    const resultScoringUseCase = container.get('Scoring.UseCase.Result');
    const data = await resultScoringUseCase.execute({ core, listId });
    const csv = await this.exportRepository.vicidialDataExportToCSV(data);
    return csv;
  }
}
