import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependencyInjection/infocall';
import { IBaseController } from '@shared/domain/BaseController';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('Infocall.Bitel.Controller.GetInfo');
  router.get('/infocall/bitel/get-info/:phoneNumber', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};