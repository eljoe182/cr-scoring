import { Request, Response, NextFunction } from 'express';
import { ResultScoringParams } from 'src/features/scoring/domain/contracts';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';

export default class ExportToCSVController implements IBaseController {
  constructor(
    private exportToCSVUseCase: IBaseUseCase,
    private readonly resultScoringUseCase: IBaseUseCase<ResultScoringParams>
  ) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const params = req.params as unknown as ResultScoringParams;
    const data = await this.resultScoringUseCase.execute(params);
    const csv = await this.exportToCSVUseCase.execute(data);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${params.core}_${params.listId}.csv`);
    res.send(csv);
  }
}
