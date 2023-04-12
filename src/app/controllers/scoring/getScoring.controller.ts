import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '../../../shared/domain/BaseController';
import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';

export default class GetScoringController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const period = req.params.period;
    const result = await this.useCase.execute(period);
    res.status(200).json(result);
  }
}
