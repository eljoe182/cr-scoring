import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetScoringController from '@controller/scoring/getScoring.controller';
import GetScoringUseCase from '@feat/scoring/application/getScoring.useCase';

container
  .register('Scoring.UseCase.Get', GetScoringUseCase)
  .addArgument(new Reference('Resumenfono.Repository'))
  .addArgument(new Reference('Bitel.Repository'))
  .addArgument(new Reference('Claro.Repository'))
  .addArgument(new Reference('Entel.Repository'))
  .addArgument(new Reference('Movistar.Repository'));

container
  .register('Scoring.Controller.Get', GetScoringController)
  .addArgument(new Reference('Scoring.UseCase.Get'));

export default container;