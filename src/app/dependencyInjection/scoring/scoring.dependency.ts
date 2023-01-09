import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetScoringController from '@controller/scoring/getScoring.controller';
import GetScoringUseCase from '@feat/scoring/application/getScoring.useCase';
import GetFieldsUseCase from '@feat/scoring/application/getFields.useCase';
import GetFieldsController from '@controller/scoring/getFields.controller';
import RetrieveDataPeriodUseCase from '@feat/scoring/application/retrieveDataPeriod.useCase';
import NumberEvaluationUseCase from '@feat/scoring/application/numberEvaluation.useCase';
import BeastDateUseCase from '@feat/scoring/application/beastDate.useCase';
import SaveScoringUseCase from '@feat/scoring/application/saveSocring.useCase';
import SaveScoringController from '@app/controllers/scoring/saveScoring.controller';
import SaveHistoricUseCase from '@feat/scoring/application/saveHistoric.useCase';

container.register('Scoring.UseCase.NumberEvaluation', NumberEvaluationUseCase);

container.register('Scoring.UseCase.BeastDate', BeastDateUseCase);

container
  .register('Scoring.UseCase.DataPeriod', RetrieveDataPeriodUseCase)
  .addArgument(new Reference('Resumenfono.Repository'))
  .addArgument(new Reference('Bitel.Repository'))
  .addArgument(new Reference('Claro.Repository'))
  .addArgument(new Reference('Entel.Repository'))
  .addArgument(new Reference('Movistar.Repository'));

container
  .register('Scoring.UseCase.Get', GetScoringUseCase)
  .addArgument(new Reference('Scoring.UseCase.DataPeriod'))
  .addArgument(new Reference('Scoring.UseCase.NumberEvaluation'))
  .addArgument(new Reference('SettingsFields.Repository'))
  .addArgument(new Reference('Scoring.UseCase.BeastDate'));

container.register('Scoring.Controller.Get', GetScoringController).addArgument(new Reference('Scoring.UseCase.Get'));

/// Get Fields
container
  .register('Scoring.UseCase.GetFields', GetFieldsUseCase)
  .addArgument(new Reference('Resumenfono.Repository'))
  .addArgument(new Reference('Bitel.Repository'))
  .addArgument(new Reference('Claro.Repository'))
  .addArgument(new Reference('Entel.Repository'))
  .addArgument(new Reference('Movistar.Repository'));

container
  .register('Scoring.Controller.GetFields', GetFieldsController)
  .addArgument(new Reference('Scoring.UseCase.GetFields'));

// Save Scoring
container.register('Scoring.UseCase.Save', SaveScoringUseCase).addArgument(new Reference('Scoring.Repository'));
container
  .register('Scoring.UseCase.SaveHistoric', SaveHistoricUseCase)
  .addArgument(new Reference('ScoringHistoric.Repository'));

container
  .register('Scoring.Controller.Save', SaveScoringController)
  .addArgument(new Reference('Scoring.UseCase.Save'))
  .addArgument(new Reference('Scoring.UseCase.SaveHistoric'));

export default container;
