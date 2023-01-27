import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetScoringController from '@controller/scoring/getScoring.controller';
import GetScoringUseCase from '@feat/scoring/application/getScoring.useCase';
import RetrieveDataPeriodUseCase from '@feat/scoring/application/retrieveDataPeriod.useCase';
import NumberEvaluationUseCase from '@feat/scoring/application/numberEvaluation.useCase';
import SaveScoringUseCase from '@feat/scoring/application/saveScoring.useCase';
import SaveScoringController from '@app/controllers/scoring/saveScoring.controller';
import SaveHistoricUseCase from '@feat/scoring/application/saveHistoric.useCase';
import ShowScoringHistoricUseCase from '@feat/scoring/application/showScoringHistoric.useCase';
import ShowScoringHistoricController from '@app/controllers/scoring/showScoringHistoric.controller';

container.register('Scoring.UseCase.NumberEvaluation', NumberEvaluationUseCase);

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
  .addArgument(new Reference('SettingsFields.Repository'));

container.register('Scoring.Controller.Get', GetScoringController).addArgument(new Reference('Scoring.UseCase.Get'));

// Save Scoring
container.register('Scoring.UseCase.Save', SaveScoringUseCase).addArgument(new Reference('Scoring.Repository'));
container
  .register('Scoring.UseCase.SaveHistoric', SaveHistoricUseCase)
  .addArgument(new Reference('ScoringHistoric.Repository'));

container
  .register('Scoring.Controller.Save', SaveScoringController)
  .addArgument(new Reference('Scoring.UseCase.Save'))
  .addArgument(new Reference('Scoring.UseCase.SaveHistoric'));

// Show history
container
  .register('Scoring.UseCase.ShowHistory', ShowScoringHistoricUseCase)
  .addArgument(new Reference('ScoringHistoric.Repository'));

container
  .register('Scoring.Controller.ShowHistory', ShowScoringHistoricController)
  .addArgument(new Reference('Scoring.UseCase.ShowHistory'));

export default container;
