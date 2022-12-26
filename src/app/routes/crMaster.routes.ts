import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependencyInjection/crMaster';
import { IBaseController } from '@shared/domain/BaseController';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('Controller.CRMaster.GetInfoResumenfono');
  router.post('/cr-master/get-info', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
