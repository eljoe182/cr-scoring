import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import GetScoringController from 'src/app/controllers/scoring/GetScoring.controller';
import GetScoringUseCase from 'src/features/scoring/application/GetScoring.useCase';

import SaveScoringUseCase from 'src/features/scoring/application/SaveScoring.useCase';
import SaveScoringController from 'src/app/controllers/scoring/SaveScoring.controller';

import SaveHistoricUseCase from 'src/features/scoring/application/SaveHistoric.useCase';

import ShowScoringHistoricUseCase from 'src/features/scoring/application/ShowScoringHistoric.useCase';
import ShowScoringHistoricController from 'src/app/controllers/scoring/ShowScoringHistoric.controller';

// Get Scoring
container
  .register('Scoring.UseCase.Get', GetScoringUseCase)
  .addArgument(new Reference('ManagementHistory.UseCase.GetHistory'))
  .addArgument(new Reference('SettingFields.UseCase.GetAll'));
container
  .register('Scoring.Controller.Get', GetScoringController)
  .addArgument(new Reference('Scoring.UseCase.Get'));

// Save Scoring
container
  .register('Scoring.Controller.Save', SaveScoringController)
  .addArgument(new Reference('Scoring.UseCase.Get'))
  .addArgument(new Reference('Scoring.UseCase.Save'));

// Show history

container.register('Scoring.UseCase.Save', SaveScoringUseCase).addArgument(new Reference('Scoring.Repository'));
container
  .register('Scoring.UseCase.SaveHistoric', SaveHistoricUseCase)
  .addArgument(new Reference('ScoringHistoric.Repository'));
container
  .register('Scoring.UseCase.ShowHistory', ShowScoringHistoricUseCase)
  .addArgument(new Reference('ScoringHistoric.Repository'));

container
  .register('Scoring.Controller.ShowHistory', ShowScoringHistoricController)
  .addArgument(new Reference('Scoring.UseCase.ShowHistory'));

export default container;
