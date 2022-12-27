import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import container from '@app/dependencyInjection/scoring';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('Scoring.Controller.Get');
  router.get('/scoring/:period', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
