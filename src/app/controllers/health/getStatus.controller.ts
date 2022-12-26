import { IBaseController } from '@shared/domain/BaseController';
import { Request, Response, NextFunction } from 'express';

export default class GetStatusController implements IBaseController {
  async run(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    res.status(200).json({ status: 'OK' });
  }
}
