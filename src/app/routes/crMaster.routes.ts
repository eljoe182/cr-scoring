import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from 'src/shared/domain/BaseController';
import { CampaignDependency as campaignContainer } from 'src/app/dependencyInjection';

export const register = (router: Router) => {
  const controllerCampaign: IBaseController = campaignContainer.get('CRMaster.Campaign.Controller.GetAll');

  router.get('/cr-master/campaign/get-all', (req: Request, res: Response, next: NextFunction) => {
    return controllerCampaign.run(req, res, next);
  });
};
