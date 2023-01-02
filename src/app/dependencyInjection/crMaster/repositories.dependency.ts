import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import ResumenfonoRepository from '@feat/crMaster/infrastructure/repositories/Resumenfono.respository';

container
  .register('Resumenfono.Repository', ResumenfonoRepository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));

export default container;
