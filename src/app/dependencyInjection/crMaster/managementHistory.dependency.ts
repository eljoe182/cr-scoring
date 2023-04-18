import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import ManagementHistoryRepository from 'src/features/crMaster/infrastructure/repositories/ManagementHistory.repository';

import GetManagementHistoryUseCase from 'src/features/crMaster/application/GetManagementHistory.useCase';
import SetOperatorUseCase from 'src/features/infocall/application/SetOperator.useCase';

container
  .register('Scoring.UseCase.SetOperator', SetOperatorUseCase)
  .addArgument(new Reference('Bitel.Repository'))
  .addArgument(new Reference('Claro.Repository'))
  .addArgument(new Reference('Entel.Repository'))
  .addArgument(new Reference('Movistar.Repository'));

container
  .register('ManagementHistory.Repository', ManagementHistoryRepository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));

container
  .register('ManagementHistory.GetHistory.UseCase', GetManagementHistoryUseCase)
  .addArgument(new Reference('ManagementHistory.Repository'))
  .addArgument(new Reference('Scoring.UseCase.SetOperator'));

export default container;
