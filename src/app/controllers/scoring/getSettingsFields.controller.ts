import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';

export default class GetSettingsFieldsController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}
  async run(_req: Request, res: Response, _next: NextFunction) {
    const settingsFields = await this.useCase.execute();
    res.status(200).json(settingsFields);
  }
}
