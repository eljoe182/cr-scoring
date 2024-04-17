import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';

interface VicidialListControllerResponse {
  listId: number;
  listName: string;
  campaignId: string | null;
  active: string;
}

export default class GetVicidialListController implements IBaseController {
  constructor(private getVicidialListUseCase: IBaseUseCase<unknown, VicidialListControllerResponse>) {}

  async run(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.getVicidialListUseCase.execute();
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
