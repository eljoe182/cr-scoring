import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';
import { ResultScoringParams } from 'src/features/scoring/domain/contracts/IResultScoringParams';

export default class ResultScoringController implements IBaseController {
  constructor(private resultScoringUseCase: IBaseUseCase<ResultScoringParams>) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const params = req.params as unknown as ResultScoringParams;
    try {
      const scoring = await this.resultScoringUseCase.execute(params);
      res.json(scoring);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
