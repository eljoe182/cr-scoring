import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import ManagementHistoryRepository from '@feat/crMaster/infrastructure/repositories/ManagementHistory.repository';

import GetHistoryUseCase from '@feat/crMaster/application/getHistory.useCase';
import GetHistoryController from '@app/controllers/crMaster/getHistory.controller';
import SetOperatorUseCase from '@feat/infocall/application/setOperator.useCase';
import NumberEvaluationUseCase from '@feat/scoring/application/numberEvaluation.useCase';

container.register('Scoring.UseCase.NumberEvaluation', NumberEvaluationUseCase);

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
  .register('ManagementHistory.GetHistory.UseCase', GetHistoryUseCase)
  .addArgument(new Reference('ManagementHistory.Repository'))
  .addArgument(new Reference('Scoring.UseCase.SetOperator'))
  .addArgument(new Reference('Scoring.UseCase.NumberEvaluation'));

container
  .register('ManagementHistory.GetHistory.Controller', GetHistoryController)
  .addArgument(new Reference('ManagementHistory.GetHistory.UseCase'));

export default container;
