import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependencyInjection/health';
import GetStatusController from '@app/controllers/health/getStatus.controller';

export const register = (router: Router) => {
  const controller: GetStatusController = container.get('Controller.Health.GetStatus');
  router.get('/health', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
