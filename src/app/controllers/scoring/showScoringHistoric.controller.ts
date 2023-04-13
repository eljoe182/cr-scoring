import { Request, Response, NextFunction } from 'express';
import { IBaseController,IBaseUseCase } from '../../../shared/domain';
import { IPagination, IResultPagination } from '../../../features/scoring/domain/interface';
import { ScoringHistoric } from '../../../shared/infrastructure/persistance/entities';

export default class ShowScoringHistoryController implements IBaseController {
  constructor(private useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { length = 5, start = 0, draw } = req.query;
    const pagination: IPagination = {
      limit: Number(length),
      page: Number(start) / Number(length) + 1,
    };
    const { rows, rowsCount } = (await this.useCase.execute(pagination)) as IResultPagination<ScoringHistoric>;
    res.status(200).json({
      draw,
      recordsTotal: rowsCount,
      recordsFiltered: rowsCount,
      rows,
    });
  }
}
