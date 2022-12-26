import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { bitelDependency as container } from '@app/dependencyInjection/infocall';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('Infocall.Bitel.Controller.GetInfo');
  router.get('/infocall/bitel/get-info/:phoneNumber', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
