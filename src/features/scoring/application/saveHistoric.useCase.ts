import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IScoringHistoricRepository } from '../infrastructure/interface/IScoringHistoricRepository';
import { SaveHistoricDataContract } from '../domain/contracts/SaveHistoricData.contract';
import { ScoringHistoric } from '@shared/domain/entities/Scoring';
import { SaveScoringDataContract } from '../domain/contracts/SaveScoringData.contract';

export default class SaveHistoricUseCase implements IBaseUseCase {
  constructor(private repository: IScoringHistoricRepository) {}

  async execute(dataHistoric: SaveHistoricDataContract): Promise<unknown> {
    const { data, period, result } = dataHistoric;

    const resultHistoric = result as unknown as {
      generatedMaps: ScoringHistoric['generatedMaps'];
      identifiers: ScoringHistoric['identifiers'];
      raw: ScoringHistoric['raw'];
    };

    const dataScoring = data as unknown as SaveScoringDataContract[];

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
