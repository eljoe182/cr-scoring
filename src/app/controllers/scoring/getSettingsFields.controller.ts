import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IResultPagination } from '@feat/scoring/domain/interface/IResultPagination';
import { IParamsSettingsFields } from '@feat/scoring/domain/interface/IParamsSettingsFields';

export default class GetSettingsFieldsController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}
  async run(req: Request, res: Response, _next: NextFunction) {
    const { length = 100, start = 0, draw } = req.query;
    const campaign = req.params.campaign;

    const params: IParamsSettingsFields = {
      campaign,
      limit: Number(length),
      page: Number(start) / Number(length) + 1,
    };

    const { rows, rowsCount } = (await this.useCase.execute(params)) as IResultPagination;
    res.status(200).json({
      draw,
      recordsTotal: rowsCount,
      recordsFiltered: rowsCount,
      rows,
    });
  }
}
