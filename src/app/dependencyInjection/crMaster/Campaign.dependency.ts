import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';
import GetAllCampaignsController from 'src/app/controllers/crMaster/GetAllCampaigns.controller';
import GetAllCampaignsUseCase from 'src/features/crMaster/application/GetAllCampaigns.useCase';

container
  .register('CRMaster.Campaign.UseCase.GetAll', GetAllCampaignsUseCase)
  .addArgument(new Reference('VicidialLists.Repository'));

container
  .register('CRMaster.Campaign.Controller.GetAll', GetAllCampaignsController)
  .addArgument(new Reference('CRMaster.Campaign.UseCase.GetAll'));

export default container;
