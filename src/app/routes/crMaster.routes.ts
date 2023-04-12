import { Router, Request, Response, NextFunction } from 'express';
import { IBaseController } from '../../shared/domain/BaseController';
import {
  ResumenfonoDependency as resumeContainer,
  ManagementHistoryDependency as managementContainer,
  CampaignDependency as campaignContainer,
} from '../../app/dependencyInjection';

export const register = (router: Router) => {
  const controllerResumePhono: IBaseController = resumeContainer.get('CRMaster.Resumenfono.Controller.GetInfo');
  const controllerManagement: IBaseController = managementContainer.get('ManagementHistory.GetHistory.Controller');
  const controllerCampaign: IBaseController = campaignContainer.get('CRMaster.Campaign.Controller.GetAll');

  router.get('/cr-master/resumenfono/get-info/:phoneNumber', (req: Request, res: Response, next: NextFunction) => {
    return controllerResumePhono.run(req, res, next);
  });
  
  router.post('/cr-master/management-history/get-history', (req: Request, res: Response, next: NextFunction) => {
    return controllerManagement.run(req, res, next);
  });
  
  router.get('/cr-master/campaign/get-all', (req: Request, res: Response, next: NextFunction) => {
    return controllerCampaign.run(req, res, next);
  });
};
