import { Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';

export default class GetStatusController implements IBaseController {
  async run(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    res.status(200).json({ status: 'OK' });
  }
}
