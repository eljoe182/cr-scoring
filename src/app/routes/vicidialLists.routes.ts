import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from 'src/shared/domain/BaseController';
import { ViciDialListsDependency as container } from 'src/app/dependencyInjection';

export const register = (router: Router) => {
  const getController: IBaseController = container.get('CRMaster.VicidialLists.Controller.GetVicidialLists');

  router.get('/vicidial-lists/get-lists', (req: Request, res: Response, next: NextFunction) => {
    return getController.run(req, res, next);
  });
};
