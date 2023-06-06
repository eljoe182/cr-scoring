import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';

export default class GetScoringRulesController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const campaign = req.params.campaign;
    const result = await this.useCase.execute(campaign);
    res.status(200).json(result);
  }
}