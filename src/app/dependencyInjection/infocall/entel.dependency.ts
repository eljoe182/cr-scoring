import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetInfoEntelController from '@controller/infocall/getEntel.controller';
import EntelRepository from '@feat/infocall/infrastructure/repositories/Entel.repository';
import GetInfoEntelUseCase from '@feat/infocall/application/getInfoEntel.useCase';

container.register('Entel.Repository', EntelRepository).addArgument(new Reference('DataSource.Infocall.Client'));

container
  .register('Infocall.Entel.UseCase.GetInfo', GetInfoEntelUseCase)
  .addArgument(new Reference('Entel.Repository'));

container
  .register('Infocall.Entel.Controller.GetInfo', GetInfoEntelController)
  .addArgument(new Reference('Infocall.Entel.UseCase.GetInfo'));

export default container;
