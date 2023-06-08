import { IBaseUseCase } from 'src/shared/domain';
import { IScoringRulesRepository } from '../infrastructure/interface/IScoringRulesRepository';
import { ISaveRulesParams } from '../domain/interface/ISaveRulesParams';
import { ScoringRules } from 'src/shared/infrastructure/persistance/entities';

export default class SaveScoringRulesUseCase implements IBaseUseCase {
  constructor(private readonly repository: IScoringRulesRepository<ScoringRules>) {}
  async execute(rules: ISaveRulesParams) {
    return this.repository.save(rules);
  }
}
