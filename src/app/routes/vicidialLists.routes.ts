import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { vicidiallistsDependency as container } from '@app/dependencyInjection/crMaster';

export const register = (router: Router) => {
  const getController: IBaseController = container.get('CRMaster.VicidialLists.Controller.GetVicidialLists');

  router.get('/vicidial-lists/get-lists', (req: Request, res: Response, next: NextFunction) => {
    return getController.run(req, res, next);
  });
}