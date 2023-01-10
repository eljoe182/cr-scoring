import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IPagination } from '@feat/scoring/domain/interface/IPagination';
import { IResultPagination } from '@feat/scoring/domain/interface/IResultPagination';

export default class ShowScoringHistoryController implements IBaseController {
  constructor(private useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { length = 5, start = 0, draw } = req.query;
    const pagination: IPagination = {
      limit: Number(length),
      page: Number(start) / Number(length) + 1,
    };
    const { rows, rowsCount } = (await this.useCase.execute(pagination)) as IResultPagination;
    res.status(200).json({
      draw,
      recordsTotal: rowsCount,
      recordsFiltered: rowsCount,
      rows,
    });
  }
}
