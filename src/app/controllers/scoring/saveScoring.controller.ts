import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { SaveHistoricDataContract } from '@feat/scoring/domain/contracts/SaveHistoricData.contract';
import { SaveScoringDataContract } from '@feat/scoring/domain/contracts/SaveScoringData.contract';

export default class SaveScoringController implements IBaseController {
  constructor(
    private saveScoringUseCase: IBaseUseCase,
    private saveHistoricUseCase: IBaseUseCase,
    private getScoringUseCase: IBaseUseCase
  ) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const data = (await this.getScoringUseCase.execute(req.body)) as {
      page: number;
      size: number;
      success: SaveScoringDataContract[];
      total: number;
      totalPages: number;
    };

    const scoringSaved = await this.saveScoringUseCase.execute(data.success) as {
      result: unknown
    };

    const historic = await this.saveHistoricUseCase.execute({
      period: `${req.body.listId}-${req.body.campaign}`,
      data: data.success,
      result: scoringSaved,
    } as SaveHistoricDataContract);

    res.status(200).json({
      result: scoringSaved,
      historic,
    });
  }
}
