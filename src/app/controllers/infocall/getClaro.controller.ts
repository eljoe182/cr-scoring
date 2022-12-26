import { Request, Response, NextFunction } from 'express';
import { IGetInfoClaroUseCase } from '@feat/infocall/domain/interface/IGetInfoClaroUseCase';
import { IBaseController } from '@shared/domain/BaseController';

export default class GetClaroController implements IBaseController {
  constructor(private useCase: IGetInfoClaroUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const { phoneNumber } = req.params;
    const response = await this.useCase.execute(Number(phoneNumber));
    res.status(200).json(response);
  }
}
