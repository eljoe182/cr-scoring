import { IBaseUseCase } from 'src/shared/domain';
import { ScoringHistoric } from 'src/shared/infrastructure/persistance/entities';
import { IScoringHistoricRepository } from '../infrastructure/interface';
import { IPagination, IResultPagination } from 'src/shared/infrastructure/interfaces';

export default class ShowScoringHistoricUseCase
  implements IBaseUseCase<IPagination, IResultPagination<ScoringHistoric[]>>
{
  constructor(
    private scoringHistoricRepository: IScoringHistoricRepository<IPagination, IResultPagination<ScoringHistoric[]>>
  ) {}

  async execute(params: IPagination): Promise<IResultPagination<ScoringHistoric[]>> {
    return this.scoringHistoricRepository.findAll(params);
  }
}
