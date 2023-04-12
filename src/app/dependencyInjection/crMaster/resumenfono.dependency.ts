import { Reference } from 'node-dependency-injection';
import container from '../../../shared/infrastructure/dependency';

import GetInfoResumenfonoController from '../../controllers/crMaster/getInfoResumenfono.controller';
import GetInfoResumenfonoUseCase from '../../../features/crMaster/application/getInfoResumenfono.useCase';

container
  .register('CRMaster.Resumenfono.UseCase.GetInfo', GetInfoResumenfonoUseCase)
  .addArgument(new Reference('Resumenfono.Repository'));

container
  .register('CRMaster.Resumenfono.Controller.GetInfo', GetInfoResumenfonoController)
  .addArgument(new Reference('CRMaster.Resumenfono.UseCase.GetInfo'));

export default container;
