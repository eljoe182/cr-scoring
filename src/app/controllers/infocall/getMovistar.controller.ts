import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IGetInfoMovistarUseCase } from '@feat/infocall/domain/interface/IGetInfoMovistarUseCase';

export default class GetInfoMovistarController implements IBaseController {
  constructor(private useCase: IGetInfoMovistarUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const { phoneNumber } = req.params;
    const response = await this.useCase.execute(Number(phoneNumber));
    res.status(200).json(response);
  }
}
