import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '../../shared/domain/BaseController';
import { ScoringDependency as container } from '../../app/dependencyInjection';

export const register = (router: Router) => {
  const saveController: IBaseController = container.get('Scoring.Controller.Save');
  const showHistoricController: IBaseController = container.get('Scoring.Controller.ShowHistory');
  const resultScoringController: IBaseController = container.get('Scoring.Controller.Result');

  router.post('/scoring/save', (req: Request, res: Response, next: NextFunction) => {
    return saveController.run(req, res, next);
  });
  router.get('/scoring/show-historic', (req: Request, res: Response, next: NextFunction) => {
    return showHistoricController.run(req, res, next);
  });
  router.get('/scoring/match-dial/:core/:listId', (req: Request, res: Response, next: NextFunction) => {
    return resultScoringController.run(req, res, next);
  });
};
