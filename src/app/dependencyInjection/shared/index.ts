import container from '@shared/infrastructure/dependency';
import WinstonLogger from '@shared/infrastructure/logger/WinstonLogger';
import { CRMasterClient } from '@shared/infrastructure/persistance/mssql/CRMasterClient';
import { CRMasterConfig } from '@shared/infrastructure/persistance/mssql/CRMasterConfig';
import { InfocallClient } from '@shared/infrastructure/persistance/mysql/InfocallClient';
import { InfocallConfig } from '@shared/infrastructure/persistance/mysql/InfocallConfig';
import { Reference } from 'node-dependency-injection';

container.register('Logger', WinstonLogger);

container.register('DataSource.CRMaster.Config', CRMasterConfig);

container
  .register('DataSource.CRMaster.Client', CRMasterClient)
  .addArgument(new Reference('DataSource.CRMaster.Config'));

container.register('DataSource.Infocall.Config', InfocallConfig);

container
  .register('DataSource.Infocall.Client', InfocallClient)
  .addArgument(new Reference('DataSource.Infocall.Config'));

export default container;
