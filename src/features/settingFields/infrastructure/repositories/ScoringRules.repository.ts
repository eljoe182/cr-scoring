import { DataSource } from 'typeorm';
import { IScoringRulesRepository } from '../interface/IScoringRulesRepository';
import { ScoringRules, ScoringRulesEntity } from 'src/shared/infrastructure/persistance/entities';

export class ScoringRulesRepository implements IScoringRulesRepository {
  constructor(private orm: DataSource) {}

  async get(campaign: string) {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getMongoRepository(ScoringRulesEntity);

    const response = await repository.findOne({
      where: {
        campaign,
      }
    });

    orm.destroy();

    return {
      message: 'ScoringRules fetched successfully',
      data: response,
    };
  }

  async save(rules: ScoringRules) {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getMongoRepository(ScoringRulesEntity);

    const response = await repository.updateOne(
      {
        campaign: rules.campaign,
      },
      {
        $set: {
          score1: rules.score1,
          score2: rules.score2,
          score3: rules.score3,
          score4: rules.score4,
          score5: rules.score5,
        },
      },
      {
        upsert: true,
      }
    );

    orm.destroy();

    return {
      message: 'ScoringRules saved successfully',
      data: response,
    };
  }
}
