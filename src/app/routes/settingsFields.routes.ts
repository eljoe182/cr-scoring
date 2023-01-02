import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { scoringSettingFieldsDependency as container } from '@app/dependencyInjection/scoring';

export const register = (router: Router) => {
  const controller: IBaseController = container.get('Scoring.Controller.SettingFields.Save');
  router.post('/scoring/settings/fields/save', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
