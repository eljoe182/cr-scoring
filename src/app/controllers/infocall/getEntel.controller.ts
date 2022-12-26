import { Request, Response, NextFunction } from 'express';
import { IGetInfoEntelUseCase } from '@feat/infocall/domain/interface/IGetInfoEntelUseCase';
import { IBaseController } from '@shared/domain/BaseController';

export default class GetEntelController implements IBaseController {
  constructor(private useCase: IGetInfoEntelUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const { phoneNumber } = req.params;
    const response = await this.useCase.execute(Number(phoneNumber));
    res.status(200).json(response);
  }
}
