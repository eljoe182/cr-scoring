import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependencyInjection/crMaster';
import { IBaseController } from '@shared/domain/BaseController';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('CRMaster.Resumenfono.Controller.GetInfo');
  router.get('/cr-master/resumenfono/get-info/:phoneNumber', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
