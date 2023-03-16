import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import container from '@shared/infrastructure/dependency';

export default class ResultScoringController implements IBaseController {
  private pagination = container.get('Utils.Pagination');
  constructor(private resultScoringUseCase: IBaseUseCase) {}
  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { core, listId } = req.params;
    const resultScoring = await this.resultScoringUseCase.execute({ core, listId });
    const result = this.pagination.getPaginatedItems(resultScoring, 1, 1000);
    res.json(result.success);
  }
}
