import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import GetFieldsUseCase from 'src/features/scoring/application/GetFields.useCase';
import GetFieldsController from 'src/app/controllers/settingsFields/GetFields.controller';
import SaveSettingsFieldsUseCase from 'src/features/settingFields/application/SaveSettingsFields.useCase';
import SaveSettingsFieldsController from 'src/app/controllers/settingsFields/SaveSettings.controller';
import GetSettingsFieldsUseCase from 'src/features/settingFields/application/GetSettingsFields.useCase';
import GetSettingsFieldsController from 'src/app/controllers/settingsFields/GetSettingsFields.controller';
import DestroySettingsFieldsUseCase from 'src/features/settingFields/application/DestroySettingsFields.useCase';
import DestroySettingsFieldsController from 'src/app/controllers/settingsFields/DestroySettingsFields.controller';
import GetDistinctByFieldUseCase from 'src/features/settingFields/application/GetDistinctByField.useCase';
import GetDistinctByFieldController from 'src/app/controllers/settingsFields/GetDistinctByField.controller';

/// Get Fields
container
  .register('SettingFields.UseCase.GetFields', GetFieldsUseCase)
  .addArgument(new Reference('Resumenfono.Repository'))
  .addArgument(new Reference('Bitel.Repository'))
  .addArgument(new Reference('Claro.Repository'))
  .addArgument(new Reference('Entel.Repository'))
  .addArgument(new Reference('Movistar.Repository'));

container
  .register('SettingFields.Controller.GetFields', GetFieldsController)
  .addArgument(new Reference('SettingFields.UseCase.GetFields'));

container
  .register('SettingFields.UseCase.Save', SaveSettingsFieldsUseCase)
  .addArgument(new Reference('SettingsFields.Repository'));

container
  .register('SettingFields.Controller.Save', SaveSettingsFieldsController)
  .addArgument(new Reference('SettingFields.UseCase.Save'));

container
  .register('SettingFields.UseCase.GetAll', GetSettingsFieldsUseCase)
  .addArgument(new Reference('SettingsFields.Repository'));

container
  .register('SettingFields.Controller.GetAll', GetSettingsFieldsController)
  .addArgument(new Reference('SettingFields.UseCase.GetAll'));

container
  .register('SettingFields.UseCase.Destroy', DestroySettingsFieldsUseCase)
  .addArgument(new Reference('SettingsFields.Repository'));

container
  .register('SettingFields.Controller.Destroy', DestroySettingsFieldsController)
  .addArgument(new Reference('SettingFields.UseCase.Destroy'));

container.register('SettingFields.UseCase.DistinctValue', GetDistinctByFieldUseCase);

container
  .register('SettingFields.Controller.DistinctValue', GetDistinctByFieldController)
  .addArgument(new Reference('SettingFields.UseCase.DistinctValue'));

export default container;
