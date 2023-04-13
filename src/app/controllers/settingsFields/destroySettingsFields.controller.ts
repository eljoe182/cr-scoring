import { Request, Response, NextFunction } from 'express';
import { IBaseController,IBaseUseCase } from '../../../shared/domain';

export default class DestroySettingsFieldsController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}
  async run(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const settingsFields = await this.useCase.execute(id);
    res.status(200).json(settingsFields);
  }
}
