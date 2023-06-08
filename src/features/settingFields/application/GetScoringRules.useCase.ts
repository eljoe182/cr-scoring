import { IBaseUseCase } from 'src/shared/domain';
import { IScoringRulesRepository } from '../infrastructure/interface/IScoringRulesRepository';
import { ScoringRules } from 'src/shared/infrastructure/persistance/entities';

export default class GetScoringRulesUseCase implements IBaseUseCase {
  constructor(private readonly repository: IScoringRulesRepository<string, ScoringRules>) {}

  async execute(campaign: string) {
    const result = await this.repository.get(campaign);
    return result;
  }
}