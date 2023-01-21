import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';

export default class ExportToCSVController implements IBaseController {
  constructor(private exportToCSVUseCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { core, listId } = req.params;
    const csv = await this.exportToCSVUseCase.execute({ core, listId });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${core}_${listId}.csv`);
    res.send(csv);
  }
}
