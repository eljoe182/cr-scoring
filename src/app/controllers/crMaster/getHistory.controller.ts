import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';

export default class GetHistoryController implements IBaseController {
  constructor(private useCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const response = await this.useCase.execute(req.body);
    if (!response) {
      res.status(404).json({ message: 'Numbers not founds' });
    } else {
      res.status(200).json(response);
    }
  }
}
