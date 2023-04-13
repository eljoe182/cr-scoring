import { IBaseUseCase } from 'src/shared/domain';
import { IScoringHistoricRepository } from '../infrastructure/interface';
import { SaveHistoricDataContract, SaveScoringDataContract } from '../domain/contracts';
import { ScoringHistoric } from 'src/shared/infrastructure/persistance/entities';

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
