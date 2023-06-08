import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';

export default class SaveScoringRulesController implements IBaseController {
  constructor(private readonly useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const fieldsConfig = req.body;
    const result = await this.useCase.execute(fieldsConfig);
    res.status(200).json(result);
  }
}
