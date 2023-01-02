import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetInfoEntelController from '@controller/infocall/getEntel.controller';
import GetInfoEntelUseCase from '@feat/infocall/application/getInfoEntel.useCase';

container
  .register('Infocall.Entel.UseCase.GetInfo', GetInfoEntelUseCase)
  .addArgument(new Reference('Entel.Repository'));

container
  .register('Infocall.Entel.Controller.GetInfo', GetInfoEntelController)
  .addArgument(new Reference('Infocall.Entel.UseCase.GetInfo'));

export default container;
