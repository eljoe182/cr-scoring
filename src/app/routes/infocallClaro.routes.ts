import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { claroDependency as container } from '@app/dependencyInjection/infocall';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('Infocall.Claro.Controller.GetInfo');
  router.get('/infocall/claro/get-info/:phoneNumber', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
