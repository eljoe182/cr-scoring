import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';
import GetInfoResumenfono from '@controller/crMaster/getInfoResumenfono.controller';
import GetInfoResumenfonoUseCase from '@feat/crMaster/application/getInfoResumenfono.useCase';
import ResumenfonoRepository from '@feat/crMaster/infrastructure/repositories/Resumenfono.respository';

container
  .register('Resumenfono.Repository', ResumenfonoRepository)
  .addArgument(new Reference('DataSource.CRMaster.Client'));

container
  .register('CRMaster.Resumenfono.UseCase.GetInfo', GetInfoResumenfonoUseCase)
  .addArgument(new Reference('Resumenfono.Repository'));

container
  .register('CRMaster.Resumenfono.Controller.GetInfo', GetInfoResumenfono)
  .addArgument(new Reference('CRMaster.Resumenfono.UseCase.GetInfo'));

export default container;
