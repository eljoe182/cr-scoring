import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import SettingsFieldsRepository from 'src/features/settingFields/infrastructure/repositories/SettingsFields.repository';

container
  .register('SettingsFields.Repository', SettingsFieldsRepository)
  .addArgument(new Reference('DataSource.Scoring.Client'));

export default container;
