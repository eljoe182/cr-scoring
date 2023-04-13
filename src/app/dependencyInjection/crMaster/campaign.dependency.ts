import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';
import GetAllCampaignsController from 'src/app/controllers/crMaster/getAllCampaigns.controller';
import GetAllCampaignsUseCase from 'src/features/crMaster/application/getAllCampaigns.useCase';

container
  .register('CRMaster.Campaign.UseCase.GetAll', GetAllCampaignsUseCase)
  .addArgument(new Reference('Wallet.Repository'));

container
  .register('CRMaster.Campaign.Controller.GetAll', GetAllCampaignsController)
  .addArgument(new Reference('CRMaster.Campaign.UseCase.GetAll'));

export default container;
