import { IBaseUseCase } from 'src/shared/domain';
import { ScoringHistoric } from 'src/shared/infrastructure/persistance/entities';
import { IPagination, IResultPagination } from '../domain/interface';
import { IScoringHistoricRepository } from '../infrastructure/interface';

export default class ShowScoringHistoricUseCase implements IBaseUseCase {
  constructor(private scoringHistoricRepository: IScoringHistoricRepository) {}

  async execute(pagination: IPagination): Promise<IResultPagination<ScoringHistoric[]>> {
    return this.scoringHistoricRepository.findAll(pagination);
  }
}
