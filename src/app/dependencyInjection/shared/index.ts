import container from '@shared/infrastructure/dependency';
import WinstonLogger from '@shared/infrastructure/logger/WinstonLogger';
import { CRMasterClient } from '@shared/infrastructure/persistance/mssql/CRMasterClient';
import { CRMasterConfig } from '@shared/infrastructure/persistance/mssql/CRMasterConfig';
import { Reference } from 'node-dependency-injection';

container.register('Logger', WinstonLogger);

container.register('DataSource.CRMaster.Config', CRMasterConfig);

container
  .register('DataSource.CRMaster.Client', CRMasterClient)
  .addArgument(new Reference('DataSource.CRMaster.Config'));

export default container;
