import { NextFunction, Request, Response } from 'express';
import { Params } from '@shared/domain/contracts/Params.contract';
import { IBaseController } from '@shared/domain/BaseController';
import { IGetInfoResumenfonoUseCase } from '@feat/crMaster/domain/interface/IGetInfoResumenfonoUseCase';

export default class GetInfoResumenfonoController implements IBaseController {
  constructor(private useCase: IGetInfoResumenfonoUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const params = req.body as unknown as Params;
    const response = await this.useCase.execute(params);
    res.status(200).json(response);
  }
}
