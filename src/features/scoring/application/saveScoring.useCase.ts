import { IBaseUseCase } from '../../../shared/domain';
import { IScoringRepository } from '../infrastructure/interface';
import { SaveScoringDataContract } from '../../../features/scoring/domain/contracts';

export default class SaveScoringUseCase implements IBaseUseCase {
  constructor(private repository: IScoringRepository) {}

  async execute(data: SaveScoringDataContract[]): Promise<unknown> {
    return this.repository.saveScoring(data);
  }
}
