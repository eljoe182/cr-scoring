import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from 'src/shared/domain/BaseController';

import { HealthDependency as container } from 'src/app/dependencyInjection';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('Controller.Health.GetStatus');
  router.get('/health', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
