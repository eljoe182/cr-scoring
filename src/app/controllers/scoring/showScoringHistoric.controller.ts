import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IPagination } from '@feat/scoring/domain/interface/IPagination';

export default class ShowScoringHistoryController implements IBaseController {
  constructor(private useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { limit = 5, page = 1 } = req.query;
    const pagination: IPagination = {
      limit: Number(limit),
      page: Number(page),
    };
    const result = await this.useCase.execute(pagination);
    res.status(200).json(result);
  }
}
