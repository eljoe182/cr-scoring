import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';
import { GetSettingsFieldsUseCaseParams } from 'src/features/settingFields/domain/interface/ISettingsFieldsParams';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';
import { IResultPagination } from 'src/shared/infrastructure/interfaces';

export default class GetSettingsFieldsController implements IBaseController {
  constructor(
    private readonly useCase: IBaseUseCase<GetSettingsFieldsUseCaseParams, IResultPagination<SettingsFields>>
  ) {}
  async run(req: Request, res: Response, _next: NextFunction) {
    const { length = 100, start = 0, draw } = req.query;
    const campaign = req.params.campaign;

    const params: GetSettingsFieldsUseCaseParams = {
      campaign,
      size: Number(length),
      page: Number(start) / Number(length) + 1,
    };

    const { rows, rowsCount } = await this.useCase.execute(params);
    res.status(200).json({
      draw,
      recordsTotal: rowsCount,
      recordsFiltered: rowsCount,
      rows,
    });
  }
}
