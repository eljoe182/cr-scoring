import { NextFunction, Request, Response } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { IGetInfoResumenfonoUseCase } from '@feat/crMaster/domain/interface/IGetInfoResumenfonoUseCase';

export default class GetInfoResumenfonoController implements IBaseController {
  constructor(private useCase: IGetInfoResumenfonoUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const { phoneNumber } = req.params;
    const response = await this.useCase.execute(phoneNumber);
    res.status(200).json(response);
  }
}
