import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '@shared/domain/BaseController';
import { scoringDependency as container } from '@app/dependencyInjection/scoring';

export const register = (router: Router) => {
  const getScoringController: IBaseController = container.get('Scoring.Controller.Get');
  const getFieldsController: IBaseController = container.get('Scoring.Controller.GetFields');
  const saveController: IBaseController = container.get('Scoring.Controller.Save');
  const showHistoricController: IBaseController = container.get('Scoring.Controller.ShowHistory');

  router.get('/scoring/period/:period', (req: Request, res: Response, next: NextFunction) => {
    return getScoringController.run(req, res, next);
  });

  router.get('/scoring/get-fields', (req: Request, res: Response, next: NextFunction) => {
    return getFieldsController.run(req, res, next);
  });
  
  router.post('/scoring/save', (req: Request, res: Response, next: NextFunction) => {
    return saveController.run(req, res, next);
  });
  
  router.get('/scoring/show-historic', (req: Request, res: Response, next: NextFunction) => {
    return showHistoricController.run(req, res, next);
  });
};
