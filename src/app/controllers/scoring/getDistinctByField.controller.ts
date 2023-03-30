import { NextFunction, Request, Response } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IParamsDistinctValues } from '@feat/scoring/domain/interface/IParamsDistinctValues';

export default class GetDistinctByFieldController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const { field, table } = req.body as IParamsDistinctValues;
    const result = await this.useCase.execute({
      field,
      table,
    });
    res.status(200).json(result);
  }
}
