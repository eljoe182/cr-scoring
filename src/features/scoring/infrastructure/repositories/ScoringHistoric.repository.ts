import { DataSource } from 'typeorm';
import { ScoringHistoricEntity, ScoringHistoric } from 'src/shared/infrastructure/persistance/entities';
import { IScoringHistoricRepository } from '../interface';
import { IPagination, IResultPagination } from 'src/shared/infrastructure/interfaces';
import { ResponseRepositoryBase } from 'src/shared/domain/contracts';

export default class ScoringHistoricRepository implements IScoringHistoricRepository {
  constructor(private orm: DataSource) {}

  async saveHistoric(scoringHistoric: ScoringHistoricEntity): Promise<ResponseRepositoryBase<ScoringHistoric>> {
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

  async findAll(params: IPagination): Promise<IResultPagination<ScoringHistoric[]>> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ScoringHistoricEntity);
    const [rows, rowsCount] = await repository.findAndCount({
      take: params.size,
      skip: params.size * (params.page - 1),
      order: {
        createdAt: 'DESC',
      },
    });
    orm.destroy();
    return {
      page: params.page,
      limit: params.size,
      rowsCount,
      rows,
    };
  }
}
