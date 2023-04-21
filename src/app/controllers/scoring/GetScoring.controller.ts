import { Request, Response, NextFunction } from 'express';
import { GetScoringParams } from 'src/features/scoring/domain/contracts';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';

export default class GetScoringController implements IBaseController {
  constructor(private readonly getScoringUseCase: IBaseUseCase) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const body = req.body as unknown as GetScoringParams;
    const data = await this.getScoringUseCase.execute(body);

    if (!data) {
      res.status(404).json({ message: 'Numbers not founds' });
      return;
    }
    res.status(200).json(data);
  }
}
