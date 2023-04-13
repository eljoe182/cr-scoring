import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import SettingsFieldsRepository from 'src/features/settingFields/infrastructure/repositories/SettingsFields.repository';
import ScoringHistoricRepository from 'src/features/scoring/infrastructure/repositories/ScoringHistoric.repository';
import ScoringRepository from 'src/features/scoring/infrastructure/repositories/Scoring.repository';

container
  .register('SettingsFields.Repository', SettingsFieldsRepository)
  .addArgument(new Reference('DataSource.Scoring.Client'));

container
  .register('ScoringHistoric.Repository', ScoringHistoricRepository)
  .addArgument(new Reference('DataSource.Scoring.Client'));

container.register('Scoring.Repository', ScoringRepository).addArgument(new Reference('DataSource.Infocall.Client'));

export default container;
