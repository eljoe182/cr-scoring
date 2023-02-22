import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import ManagementHistoryRepository from '@feat/crMaster/infrastructure/repositories/ManagementHistory.repository';

import GetHistoryUseCase from '@feat/crMaster/application/getHistory.useCase';
import GetHistoryController from '@app/controllers/crMaster/getHistory.controller';

container
  .register('ManagementHistory.Repository', ManagementHistoryRepository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));

container
  .register('ManagementHistory.GetHistory.UseCase', GetHistoryUseCase)
  .addArgument(new Reference('ManagementHistory.Repository'));

container
  .register('ManagementHistory.GetHistory.Controller', GetHistoryController)
  .addArgument(new Reference('ManagementHistory.GetHistory.UseCase'));

export default container;
