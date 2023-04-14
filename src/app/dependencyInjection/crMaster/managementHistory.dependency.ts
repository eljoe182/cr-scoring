import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import ManagementHistoryRepository from 'src/features/crMaster/infrastructure/repositories/ManagementHistory.repository';

import GetHistoryUseCase from 'src/features/crMaster/application/GetHistory.useCase';
import GetHistoryController from 'src/app/controllers/crMaster/GetHistory.controller';
import SetOperatorUseCase from 'src/features/infocall/application/SetOperator.useCase';
import NumberEvaluationUseCase from 'src/features/scoring/application/NumberEvaluation.useCase';

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
  .addArgument(new Reference('Scoring.UseCase.NumberEvaluation'))
  .addArgument(new Reference('Scoring.UseCase.SettingFields.GetAll'));

container
  .register('ManagementHistory.GetHistory.Controller', GetHistoryController)
  .addArgument(new Reference('ManagementHistory.GetHistory.UseCase'));

export default container;
