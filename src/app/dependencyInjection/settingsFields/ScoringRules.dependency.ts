import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import SaveScoringRulesUseCase from 'src/features/settingFields/application/SaveScoringRules.useCase';
import SaveScoringRulesController from 'src/app/controllers/settingsFields/SaveScoringRules.controller';
import GetScoringRulesUseCase from 'src/features/settingFields/application/GetScoringRules.useCase';
import GetScoringRulesController from 'src/app/controllers/settingsFields/GetScoringRules.controller';

container.register('ScoringRules.UseCase.Save', SaveScoringRulesUseCase).addArgument(new Reference('ScoringRules.Repository'));

container
  .register('ScoringRules.Controller.Save', SaveScoringRulesController)
  .addArgument(new Reference('ScoringRules.UseCase.Save'));

container
  .register('ScoringRules.UseCase.Get', GetScoringRulesUseCase)
  .addArgument(new Reference('ScoringRules.Repository'));

container
  .register('ScoringRules.Controller.Get', GetScoringRulesController)
  .addArgument(new Reference('ScoringRules.UseCase.Get'));

export default container;
