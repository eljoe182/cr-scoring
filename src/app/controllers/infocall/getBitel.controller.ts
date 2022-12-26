import { Request, Response, NextFunction } from 'express';
import { IGetInfoBitelUseCase } from '@feat/infocall/domain/interface/IGetInfoBitelUseCase';
import { IBaseController } from '@shared/domain/BaseController';

export default class GetBitelController implements IBaseController {
  constructor(private useCase: IGetInfoBitelUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const { phoneNumber } = req.params;
    const response = await this.useCase.execute(Number(phoneNumber));
    res.status(200).json(response);
  }
}
