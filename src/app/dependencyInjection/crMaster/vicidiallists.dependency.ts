import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import VicidialListsRepository from 'src/features/crMaster/infrastructure/repositories/VicidialLists.repository';

import GetVicidialListController from 'src/app/controllers/crMaster/getVicidialListUseCase.controller';
import GetVicidialListsUseCase from 'src/features/crMaster/application/getVicidialLists.useCase';

container
  .register('VicidialLists.Repository', VicidialListsRepository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));

container
  .register('CRMaster.VicidialLists.UseCase.GetVicidialLists', GetVicidialListsUseCase)
  .addArgument(new Reference('VicidialLists.Repository'));

container
  .register('CRMaster.VicidialLists.Controller.GetVicidialLists', GetVicidialListController)
  .addArgument(new Reference('CRMaster.VicidialLists.UseCase.GetVicidialLists'));

export default container;
