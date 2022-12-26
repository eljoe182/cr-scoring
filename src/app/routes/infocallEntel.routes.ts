import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { entelDependency as container } from '@app/dependencyInjection/infocall';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('Infocall.Entel.Controller.GetInfo');
  router.get('/infocall/entel/get-info/:phoneNumber', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
