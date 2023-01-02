import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import SaveSettingsFieldsUseCase from '@feat/scoring/application/saveSettingsFields.useCase';
import SaveSettingsFieldsController from '@app/controllers/scoring/saveSettings.controller';
import GetSettingsFieldsUseCase from '@feat/scoring/application/getSettingsFields.useCase';
import GetSettingsFieldsController from '@app/controllers/scoring/getSettingsFields.controller';
import DestroySettingsFieldsUseCase from '@feat/scoring/application/destroySettingsFields.useCase';
import DestroySettingsFieldsController from '@app/controllers/scoring/destroySettingsFields.controller';

container
  .register('Scoring.UseCase.SettingFields.Save', SaveSettingsFieldsUseCase)
  .addArgument(new Reference('SettingsFields.Repository'));

container
  .register('Scoring.Controller.SettingFields.Save', SaveSettingsFieldsController)
  .addArgument(new Reference('Scoring.UseCase.SettingFields.Save'));

container
  .register('Scoring.UseCase.SettingFields.GetAll', GetSettingsFieldsUseCase)
  .addArgument(new Reference('SettingsFields.Repository'));

container
  .register('Scoring.Controller.SettingFields.GetAll', GetSettingsFieldsController)
  .addArgument(new Reference('Scoring.UseCase.SettingFields.GetAll'));

container
  .register('Scoring.UseCase.SettingFields.Destroy', DestroySettingsFieldsUseCase)
  .addArgument(new Reference('SettingsFields.Repository'));

container
  .register('Scoring.Controller.SettingFields.Destroy', DestroySettingsFieldsController)
  .addArgument(new Reference('Scoring.UseCase.SettingFields.Destroy'));

export default container;
