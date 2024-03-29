import { NextFunction, Request, Response } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';

export default class GetAllCampaignsController implements IBaseController {
  constructor(private useCase: IBaseUseCase<unknown>) {}

  async run(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.useCase.execute();
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
