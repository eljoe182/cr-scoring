import { DataSource } from 'typeorm';
import { IScoringHistoricRepository } from '../interface/IScoringHistoricRepository';
import { ScoringHistoricEntity } from '../../../../shared/infrastructure/persistance/entities';
import { IPagination } from '../../../../features/scoring/domain/interface/IPagination';
import { IResultPagination } from '../../../../features/scoring/domain/interface/IResultPagination';

export default class ScoringHistoricRepository implements IScoringHistoricRepository {
  constructor(private orm: DataSource) {}

  async saveHistoric(scoringHistoric: ScoringHistoricEntity): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ScoringHistoricEntity);
    
    const data = repository.create(scoringHistoric);
    const result = await repository.save(data);

    orm.destroy();
    return {
      message: 'SettingsFields saved successfully',
      data: result,
    };
  }

  async findAll(pagination: IPagination): Promise<IResultPagination> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ScoringHistoricEntity);
    const [rows, rowsCount] = await repository.findAndCount({
      take: pagination.limit,
      skip: pagination.limit * (pagination.page - 1),
      order: {
        createdAt: 'DESC',
      },
    });
    orm.destroy();
    return {
      page: pagination.page,
      limit: pagination.limit,
      rowsCount,
      rows,
    };
  }
}
