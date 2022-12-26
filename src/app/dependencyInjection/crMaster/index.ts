import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';
import GetInfoResumenfono from '@controller/crMaster/getInfoResumenfono.controller';
import GetInfoResumenfonoUseCase from '@feat/crMaster/application/getInfoResumenfono.useCase';
import ResumenfonoRepository from '@feat/crMaster/infrastructure/repositories/Resumenfono.respository';

container
  .register('Resumenfono.Repository', ResumenfonoRepository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));

container
  .register('CRMaster.Resumenfono.GetInfo', GetInfoResumenfonoUseCase)
  .addArgument(new Reference('Resumenfono.Repository'));

container
  .register('Controller.CRMaster.GetInfoResumenfono', GetInfoResumenfono)
  .addArgument(new Reference('CRMaster.Resumenfono.GetInfo'));

export default container;
