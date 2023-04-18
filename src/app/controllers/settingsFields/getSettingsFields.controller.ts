import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';
import { IResultPagination } from 'src/features/scoring/domain/interface';
import { GetSettingsFieldsUseCaseParams } from 'src/features/settingFields/domain/interface/ISettingsFieldsParams';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';

export default class GetSettingsFieldsController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}
  async run(req: Request, res: Response, _next: NextFunction) {
    const { length = 100, start = 0, draw } = req.query;
    const campaign = req.params.campaign;

    const params: GetSettingsFieldsUseCaseParams = {
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
