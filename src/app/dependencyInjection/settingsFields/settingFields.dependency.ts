import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import GetFieldsUseCase from 'src/features/scoring/application/getFields.useCase';
import GetFieldsController from 'src/app/controllers/settingsFields/getFields.controller';
import SaveSettingsFieldsUseCase from 'src/features/settingFields/application/saveSettingsFields.useCase';
import SaveSettingsFieldsController from 'src/app/controllers/settingsFields/saveSettings.controller';
import GetSettingsFieldsUseCase from 'src/features/settingFields/application/getSettingsFields.useCase';
import GetSettingsFieldsController from 'src/app/controllers/settingsFields/getSettingsFields.controller';
import DestroySettingsFieldsUseCase from 'src/features/settingFields/application/destroySettingsFields.useCase';
import DestroySettingsFieldsController from 'src/app/controllers/settingsFields/destroySettingsFields.controller';
import GetDistinctByFieldUseCase from 'src/features/settingFields/application/getDistinctByField.useCase';
import GetDistinctByFieldController from 'src/app/controllers/settingsFields/getDistinctByField.controller';

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
