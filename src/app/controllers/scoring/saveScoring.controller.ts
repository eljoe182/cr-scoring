import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { SaveHistoricDataContract } from '@feat/scoring/domain/contracts/SaveHistoricData.contract';

export default class SaveScoringController implements IBaseController {
  constructor(private saveScoringUseCase: IBaseUseCase, private saveHistoricUseCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { period, data } = req.body;
    const result = await this.saveScoringUseCase.execute(data);
    const historic = await this.saveHistoricUseCase.execute({
      period,
      data,
      result,
    } as SaveHistoricDataContract);
    console.log(historic);
    res.status(200).json(result);
  }
}
