import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from 'src/shared/domain/BaseController';
import { vicidialExporterDependency as container } from 'src/app/dependencyInjection';

export const register = (router: Router) => {
  const exportToCSVController: IBaseController = container.get('Exporter.Vicidial.Controller.CSV');

  router.get('/exporter/vicidial/:core/:listId', (req: Request, res: Response, next: NextFunction) => {
    return exportToCSVController.run(req, res, next);
  });
};
