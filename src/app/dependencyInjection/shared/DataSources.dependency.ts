import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import { ScoringClient } from 'src/shared/infrastructure/persistance/mongodb/ScoringClient';
import { ScoringConfig } from 'src/shared/infrastructure/persistance/mongodb/ScoringConfig';
import { CRMasterClient } from 'src/shared/infrastructure/persistance/mssql/CRMasterClient';
import { CRMasterConfig } from 'src/shared/infrastructure/persistance/mssql/CRMasterConfig';
import { InfocallClient } from 'src/shared/infrastructure/persistance/mysql/InfocallClient';
import { InfocallConfig } from 'src/shared/infrastructure/persistance/mysql/InfocallConfig';
import RedisClient from 'src/shared/infrastructure/persistance/redis/RedisClient';
import { RedisRepository } from 'src/shared/infrastructure/persistance/redis/RedisRepository';

container.register('DataSource.CRMaster.Config', CRMasterConfig);
container
  .register('DataSource.CRMaster.Client', CRMasterClient)
  .addArgument(new Reference('DataSource.CRMaster.Config'));

container.register('DataSource.Infocall.Config', InfocallConfig);
container
  .register('DataSource.Infocall.Client', InfocallClient)
  .addArgument(new Reference('DataSource.Infocall.Config'));

container.register('DataSource.Scoring.Config', ScoringConfig);
container.register('DataSource.Scoring.Client', ScoringClient).addArgument(new Reference('DataSource.Scoring.Config'));

container.register('DataSource.Redis.Client', RedisClient);
container
  .register('DataSource.Redis.Repository', RedisRepository)
  .addArgument(new Reference('DataSource.Redis.Client'));

export default container;
