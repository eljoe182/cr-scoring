import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { IPagination } from '../domain/interface/IPagination';
import { IResultPagination } from '../domain/interface/IResultPagination';
import { IScoringHistoricRepository } from '../infrastructure/interface/IScoringHistoricRepository';

export default class ShowScoringHistoricUseCase implements IBaseUseCase {
  constructor(private scoringHistoricRepository: IScoringHistoricRepository) {}

  async execute(pagination: IPagination): Promise<IResultPagination> {
    return this.scoringHistoricRepository.findAll(pagination);
  }
}
