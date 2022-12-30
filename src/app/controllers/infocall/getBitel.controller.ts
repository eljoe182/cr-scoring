import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';

export default class GetBitelController implements IBaseController {
  constructor(private useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const { phoneNumber } = req.params;
    const response = await this.useCase.execute(Number(phoneNumber));
    res.status(200).json(response);
  }
}
