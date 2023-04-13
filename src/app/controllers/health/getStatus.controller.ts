import { Request, Response, NextFunction } from 'express';
import { IBaseController } from 'src/shared/domain';

export default class GetStatusController implements IBaseController {
  async run(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    res.status(200).json({ status: 'OK' });
  }
}
