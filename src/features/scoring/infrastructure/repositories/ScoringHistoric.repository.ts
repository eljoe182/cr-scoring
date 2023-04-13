import { DataSource } from 'typeorm';
import { ScoringHistoricEntity, ScoringHistoric } from '../../../../shared/infrastructure/persistance/entities';
import { IScoringHistoricRepository } from '../interface';
import { IPagination, IResultPagination } from '../../domain/interface';

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

  async findAll(pagination: IPagination): Promise<IResultPagination<ScoringHistoric[]>> {
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
