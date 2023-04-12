import { Reference } from 'node-dependency-injection';
import container from '../../../shared/infrastructure/dependency';
import ResultScoringUseCase from '../../../features/scoring/application/resultScoring.useCase';
import ResultScoringController from '../../../app/controllers/scoring/resultScoring.controller';
import GetInfoVicidialUseCase from '../../../features/crMaster/application/getInfoVicidial.useCase';
import RankNumberUseCase from '../../../features/crMaster/application/rankNumber.useCase';

container.register('Scoring.UseCase.RankNumber', RankNumberUseCase);

container
  .register('Vicidial.UseCase.GetInfo', GetInfoVicidialUseCase)
  .addArgument(new Reference('Scoring.Repository'))
  .addArgument(new Reference('Scoring.UseCase.RankNumber'))
  .addArgument(new Reference('VicidialCore1.Repository'))
  .addArgument(new Reference('VicidialCore11.Repository'))
  .addArgument(new Reference('VicidialCore21.Repository'));

container
  .register('Scoring.UseCase.Result', ResultScoringUseCase)
  .addArgument(new Reference('Vicidial.UseCase.GetInfo'));

container
  .register('Scoring.Controller.Result', ResultScoringController)
  .addArgument(new Reference('Scoring.UseCase.Result'));

export default container;
