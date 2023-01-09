import { DataSource } from 'typeorm';
import { IScoringHistoricRepository } from '../interface/IScoringHistoricRepository';
import { ScoringHistoric } from '@shared/domain/entities/Scoring/ScoringHistoric.entity';

export default class ScoringHistoricRepository implements IScoringHistoricRepository {
  constructor(private orm: DataSource) {}

  async saveHistoric(scoringHistoric: ScoringHistoric): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ScoringHistoric);
    
    const data = repository.create(scoringHistoric);
    const result = await repository.save(data);

    orm.destroy();
    return {
      message: 'SettingsFields saved successfully',
      data: result,
    };
  }
}
