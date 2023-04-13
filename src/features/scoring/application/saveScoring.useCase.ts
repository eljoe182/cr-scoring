import { IBaseUseCase } from 'src/shared/domain';
import { IScoringRepository } from '../infrastructure/interface';
import { SaveScoringDataContract } from 'src/features/scoring/domain/contracts';

export default class SaveScoringUseCase implements IBaseUseCase {
  constructor(private repository: IScoringRepository) {}

  async execute(data: SaveScoringDataContract[]): Promise<unknown> {
    return this.repository.saveScoring(data);
  }
}
