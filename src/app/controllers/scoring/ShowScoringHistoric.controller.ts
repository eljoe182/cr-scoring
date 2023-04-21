import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';
import { ScoringHistoric } from 'src/shared/infrastructure/persistance/entities';
import { IPagination, IResultPagination } from 'src/shared/infrastructure/interfaces';

export default class ShowScoringHistoryController implements IBaseController {
  constructor(private useCase: IBaseUseCase<IPagination, IResultPagination<ScoringHistoric>>) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { length = 5, start = 0, draw } = req.query;
    const pagination: IPagination = {
      size: Number(length),
      page: Number(start) / Number(length) + 1,
    };
    const { rows, rowsCount } = await this.useCase.execute(pagination);
    res.status(200).json({
      draw,
      recordsTotal: rowsCount,
      recordsFiltered: rowsCount,
      rows,
    });
  }
}
