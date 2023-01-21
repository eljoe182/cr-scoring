import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { vicidialExporterDependency as container } from '@app/dependencyInjection/exporter';

export const register = (router: Router) => {
  const exportToCSVController: IBaseController = container.get('Exporter.Vicidial.Controller.CSV');

  router.get('/exporter/vicidial/:core/:listId', (req: Request, res: Response, next: NextFunction) => {
    return exportToCSVController.run(req, res, next);
  });
};
