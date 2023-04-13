import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';

export default class GetVicidialListController implements IBaseController {
  constructor(private useCase: IBaseUseCase) {}

  async run(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const response = await this.useCase.execute();
    res.status(200).json(response);
  }
}
