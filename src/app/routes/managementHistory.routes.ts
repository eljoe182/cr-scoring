import { Router, Request, Response, NextFunction } from 'express';
import { managementHistoryDependency as container } from '@app/dependencyInjection/crMaster';
import { IBaseController } from '@shared/domain/BaseController';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('ManagementHistory.GetHistory.Controller');

  router.post('/management-history/get-history', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
