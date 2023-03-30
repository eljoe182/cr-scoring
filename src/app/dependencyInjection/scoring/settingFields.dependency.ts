import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetFieldsUseCase from '@feat/scoring/application/getFields.useCase';
import GetFieldsController from '@controller/scoring/getFields.controller';
import SaveSettingsFieldsUseCase from '@feat/scoring/application/saveSettingsFields.useCase';
import SaveSettingsFieldsController from '@app/controllers/scoring/saveSettings.controller';
import GetSettingsFieldsUseCase from '@feat/scoring/application/getSettingsFields.useCase';
import GetSettingsFieldsController from '@app/controllers/scoring/getSettingsFields.controller';
import DestroySettingsFieldsUseCase from '@feat/scoring/application/destroySettingsFields.useCase';
import DestroySettingsFieldsController from '@app/controllers/scoring/destroySettingsFields.controller';
import GetDistinctByFieldUseCase from '@feat/scoring/application/getDistinctByField.useCase';
import GetDistinctByFieldController from '@app/controllers/scoring/getDistinctByField.controller';

/// Get Fields
container
  .register('Scoring.UseCase.SettingFields.GetFields', GetFieldsUseCase)
  .addArgument(new Reference('Resumenfono.Repository'))
  .addArgument(new Reference('Bitel.Repository'))
  .addArgument(new Reference('Claro.Repository'))
  .addArgument(new Reference('Entel.Repository'))
  .addArgument(new Reference('Movistar.Repository'));

container
  .register('Scoring.Controller.SettingFields.GetFields', GetFieldsController)
  .addArgument(new Reference('Scoring.UseCase.SettingFields.GetFields'));

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

container.register('Scoring.UseCase.SettingFields.DistinctValue', GetDistinctByFieldUseCase);

container
  .register('Scoring.Controller.SettingFields.DistinctValue', GetDistinctByFieldController)
  .addArgument(new Reference('Scoring.UseCase.SettingFields.DistinctValue'));

export default container;
