import { Request, Response, NextFunction } from 'express';
import { IBaseController,IBaseUseCase } from '../../../shared/domain';

export default class GetFieldsController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}

  async run(_req: Request, res: Response, _next: NextFunction) {
    const result = await this.useCase.execute();
    res.status(200).json(result);
  }
}
