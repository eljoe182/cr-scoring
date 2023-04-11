import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { IScoringRepository } from '../infrastructure/interface/IScoringRepository';
import { SaveScoringDataContract } from '../../../features/scoring/domain/contracts/SaveScoringData.contract';

export default class SaveScoringUseCase implements IBaseUseCase {
  constructor(private repository: IScoringRepository) {}

  async execute(data: SaveScoringDataContract[]): Promise<unknown> {
    return this.repository.saveScoring(data);
  }
}
