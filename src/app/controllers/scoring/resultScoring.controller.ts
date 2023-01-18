import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';

export default class ResultScoringController implements IBaseController {
  constructor(private resultScoringUseCase: IBaseUseCase) {}
  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { core, listId } = req.params;
    const resultScoring = await this.resultScoringUseCase.execute({ core, listId });
    res.json(resultScoring);
  }
}
