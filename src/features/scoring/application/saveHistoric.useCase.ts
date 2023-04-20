import { IBaseUseCase } from 'src/shared/domain';
import { IScoringHistoricRepository } from '../infrastructure/interface';
import { SaveHistoricDataParams, SaveHistoricScoringData } from '../domain/contracts';
import { ScoringHistoric } from 'src/shared/infrastructure/persistance/entities';

export default class SaveHistoricUseCase implements IBaseUseCase<SaveHistoricDataParams> {
  constructor(private repository: IScoringHistoricRepository<ScoringHistoric>) {}

  async execute(params: SaveHistoricDataParams): Promise<unknown> {
    const { data, period, result } = params;

    const resultHistoric = result as unknown as {
      generatedMaps: ScoringHistoric['generatedMaps'];
      identifiers: ScoringHistoric['identifiers'];
      raw: ScoringHistoric['raw'];
    };

    const dataScoring = data as unknown as SaveHistoricScoringData[];

    const historic: ScoringHistoric = {
      period,
      data: dataScoring,
      generatedMaps: resultHistoric.generatedMaps,
      identifiers: resultHistoric.identifiers,
      raw: resultHistoric.raw,
    };

    return this.repository.saveHistoric(historic);
  }
}
