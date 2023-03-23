import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import ResumenfonoRepository from '@feat/crMaster/infrastructure/repositories/Resumenfono.respository';
import VicidialCore1Repository from '@feat/crMaster/infrastructure/repositories/VicidialCore1.repository';
import VicidialCore11Repository from '@feat/crMaster/infrastructure/repositories/VicidialCore11.repository';
import VicidialCore21Repository from '@feat/crMaster/infrastructure/repositories/VicidialCore21.repository';
import WalletRepository from '@feat/crMaster/infrastructure/repositories/Wallet.repository';

container
  .register('Resumenfono.Repository', ResumenfonoRepository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));
container
  .register('VicidialCore1.Repository', VicidialCore1Repository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));
container
  .register('VicidialCore11.Repository', VicidialCore11Repository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));
container
  .register('VicidialCore21.Repository', VicidialCore21Repository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));
container.register('Wallet.Repository', WalletRepository).addArgument(new Reference('DataSource.CRMaster.Client'));

export default container;
