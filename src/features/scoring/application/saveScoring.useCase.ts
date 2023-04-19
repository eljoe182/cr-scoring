import { IBaseUseCase } from 'src/shared/domain';
import { IScoringRepository } from '../infrastructure/interface';
import { GetScoringResult } from 'src/features/scoring/domain/contracts';
import { Scoring } from 'src/shared/infrastructure/persistance/entities';
import { SaveScoringData } from '../domain/class/SaveScoringData';
import { SaveScoringResults } from '../domain/contracts';

export default class SaveScoringUseCase implements IBaseUseCase<GetScoringResult[], SaveScoringResults> {
  constructor(private repository: IScoringRepository<Scoring[], SaveScoringResults>) {}

  async execute(data: GetScoringResult[]): Promise<SaveScoringResults> {
    const dataScoring = data.map((item) => {
      return new SaveScoringData(item);
    });
    return this.repository.saveScoring(dataScoring);
  }
}
