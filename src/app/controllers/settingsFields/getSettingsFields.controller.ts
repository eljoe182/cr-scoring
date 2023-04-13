import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from '../../../shared/domain';
import { IResultPagination } from '../../../features/scoring/domain/interface';
import { IParamsSettingsFields } from '../../../features/settingFields/domain/interface/IParamsSettingsFields';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';

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

    const { rows, rowsCount } = (await this.useCase.execute(params)) as IResultPagination<SettingsFields>;
    res.status(200).json({
      draw,
      recordsTotal: rowsCount,
      recordsFiltered: rowsCount,
      rows,
    });
  }
}
