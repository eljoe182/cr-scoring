import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import ResultScoringController from 'src/app/controllers/scoring/ResultScoring.controller';
import GetInfoVicidialUseCase from 'src/features/crMaster/application/GetInfoVicidial.useCase';
import GetScoringBulkUseCase from 'src/features/scoring/application/GetScoringBulk.useCase';

container.register('Scoring.UseCase.GetBulk', GetScoringBulkUseCase).addArgument(new Reference('Scoring.Repository'));

container
  .register('Vicidial.UseCase.GetInfo', GetInfoVicidialUseCase)
  .addArgument(new Reference('VicidialCore1.Repository'))
  .addArgument(new Reference('VicidialCore11.Repository'))
  .addArgument(new Reference('VicidialCore21.Repository'));

container
  .register('Scoring.Controller.Result', ResultScoringController)
  .addArgument(new Reference('Vicidial.UseCase.GetInfo'))
  .addArgument(new Reference('Scoring.UseCase.GetBulk'));

export default container;
