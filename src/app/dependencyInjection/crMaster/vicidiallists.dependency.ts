import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import VicidialListsRepository from '@feat/crMaster/infrastructure/repositories/VicidialLists.repository';

import GetVicidialListController from '@controller/crMaster/getVicidialListUseCase.controller';
import GetVicidialListsUseCase from '@feat/crMaster/application/getVicidialLists.useCase';

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
