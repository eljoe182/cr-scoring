import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { scoringSettingFieldsDependency as container } from '@app/dependencyInjection/scoring';

export const register = (router: Router) => {
  const getController: IBaseController = container.get('Scoring.Controller.SettingFields.GetAll');
  const saveController: IBaseController = container.get('Scoring.Controller.SettingFields.Save');
  const destroyController: IBaseController = container.get('Scoring.Controller.SettingFields.Destroy');

  router.get('/scoring/settings/fields/get-all', (req: Request, res: Response, next: NextFunction) => {
    return getController.run(req, res, next);
  });
  router.post('/scoring/settings/fields/save', (req: Request, res: Response, next: NextFunction) => {
    return saveController.run(req, res, next);
  });
  router.delete('/scoring/settings/fields/destroy/:id', (req: Request, res: Response, next: NextFunction) => {
    return destroyController.run(req, res, next);
  });
};