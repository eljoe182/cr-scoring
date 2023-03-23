import { NextFunction, Request, Response } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';

export default class GetAllCampaignsController implements IBaseController {
  constructor(private useCase: IBaseUseCase) {}

  async run(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const response = await this.useCase.execute();
    res.status(200).json(response);
  }
}
