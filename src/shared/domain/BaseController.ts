import { NextFunction, Request, Response } from 'express';

export interface IBaseController {
  run(req: Request, res: Response, next: NextFunction): Promise<void>;
}
