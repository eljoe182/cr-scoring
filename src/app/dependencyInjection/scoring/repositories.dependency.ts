import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import SettingsFieldsRepository from '@feat/scoring/infrastructure/repositories/SettingsFields.repository';
import ScoringHistoricRepository from '@feat/scoring/infrastructure/repositories/ScoringHistoric.repository';

container
  .register('SettingsFields.Repository', SettingsFieldsRepository)
  .addArgument(new Reference('DataSource.Scoring.Client'));

container
  .register('ScoringHistoric.Repository', ScoringHistoricRepository)
  .addArgument(new Reference('DataSource.Scoring.Client'));

export default container;