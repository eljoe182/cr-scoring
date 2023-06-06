import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import ResultScoringController from 'src/app/controllers/scoring/ResultScoring.controller';
import ResultScoringUseCase from 'src/features/scoring/application/ResultScoring.useCase';
import GetInfoVicidialUseCase from 'src/features/crMaster/application/GetInfoVicidial.useCase';
import GetScoringBulkUseCase from 'src/features/scoring/application/GetScoringBulk.useCase';

container.register('Scoring.UseCase.GetBulk', GetScoringBulkUseCase).addArgument(new Reference('Scoring.Repository'));

container
  .register('Vicidial.UseCase.GetInfo', GetInfoVicidialUseCase)
  .addArgument(new Reference('VicidialCore1.Repository'))
  .addArgument(new Reference('VicidialCore11.Repository'))
  .addArgument(new Reference('VicidialCore21.Repository'));

container
  .register('Scoring.UseCase.Result', ResultScoringUseCase)
  .addArgument(new Reference('Vicidial.UseCase.GetInfo'))
  .addArgument(new Reference('Scoring.UseCase.GetBulk'))
  .addArgument(new Reference('VicidialLists.Repository'))
  .addArgument(new Reference('ScoringRules.Repository'));
container
  .register('Scoring.Controller.Result', ResultScoringController)
  .addArgument(new Reference('Scoring.UseCase.Result'));

export default container;
