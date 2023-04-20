import { NextFunction, Request, Response } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';
import { IParamsDistinctValues } from 'src/features/scoring/domain/interface';
import { Tables } from 'src/features/scoring/domain/class';

export default class GetDistinctByFieldController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const { field, table } = req.body as IParamsDistinctValues<Tables>;
    const result = await this.useCase.execute({
      field,
      table,
    });
    res.status(200).json(result);
  }
}
