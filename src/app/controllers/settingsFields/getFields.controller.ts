import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';

export default class GetFieldsController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}

  async run(_req: Request, res: Response, _next: NextFunction) {
    const result = await this.useCase.execute();
    res.status(200).json(result);
  }
}
