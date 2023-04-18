import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from 'src/shared/domain/BaseController';
import {
  ResumenfonoDependency as resumeContainer,
  CampaignDependency as campaignContainer,
} from 'src/app/dependencyInjection';

export const register = (router: Router) => {
  const controllerResumePhono: IBaseController = resumeContainer.get('CRMaster.Resumenfono.Controller.GetInfo');
  const controllerCampaign: IBaseController = campaignContainer.get('CRMaster.Campaign.Controller.GetAll');

  router.get('/cr-master/resumenfono/get-info/:phoneNumber', (req: Request, res: Response, next: NextFunction) => {
    return controllerResumePhono.run(req, res, next);
  });

  router.get('/cr-master/campaign/get-all', (req: Request, res: Response, next: NextFunction) => {
    return controllerCampaign.run(req, res, next);
  });
};
