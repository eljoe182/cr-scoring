import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from 'src/shared/domain/BaseController';

import { SettingFieldsDependency as container } from 'src/app/dependencyInjection';

export const register = (router: Router) => {
  const getController: IBaseController = container.get('SettingFields.Controller.GetAll');
  const getFieldsController: IBaseController = container.get('SettingFields.Controller.GetFields');
  const saveController: IBaseController = container.get('SettingFields.Controller.Save');
  const destroyController: IBaseController = container.get('SettingFields.Controller.Destroy');
  const distinctFieldController: IBaseController = container.get('SettingFields.Controller.DistinctValue');

  router.get('/scoring/settings/fields/get-fields', (req: Request, res: Response, next: NextFunction) => {
    return getFieldsController.run(req, res, next);
  });
  router.post('/scoring/settings/fields/get-distinct-values', (req: Request, res: Response, next: NextFunction) => {
    return distinctFieldController.run(req, res, next);
  });
  router.get('/scoring/settings/fields/get-all/:campaign', (req: Request, res: Response, next: NextFunction) => {
    return getController.run(req, res, next);
  });
  router.post('/scoring/settings/fields/save', (req: Request, res: Response, next: NextFunction) => {
    return saveController.run(req, res, next);
  });
  router.delete('/scoring/settings/fields/destroy/:id', (req: Request, res: Response, next: NextFunction) => {
    return destroyController.run(req, res, next);
  });
};
