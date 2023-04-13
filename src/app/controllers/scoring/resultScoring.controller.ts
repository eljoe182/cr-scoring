import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';

export default class ResultScoringController implements IBaseController {
  constructor(private resultScoringUseCase: IBaseUseCase) {}
  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { core, listId } = req.params;
    const resultScoring = await this.resultScoringUseCase.execute({ core, listId });
    res.json(resultScoring);
  }
}
