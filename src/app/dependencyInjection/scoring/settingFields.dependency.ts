import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import SaveSettingsFieldsUseCase from '@feat/scoring/application/saveSettingsFields.useCase';
import SaveSettingsFieldsController from '@app/controllers/scoring/saveSettings.controller';

container
  .register('Scoring.UseCase.SettingFields.Save', SaveSettingsFieldsUseCase)
  .addArgument(new Reference('SettingsFields.Repository'));

container
  .register('Scoring.Controller.SettingFields.Save', SaveSettingsFieldsController)
  .addArgument(new Reference('Scoring.UseCase.SettingFields.Save'));

export default container;
