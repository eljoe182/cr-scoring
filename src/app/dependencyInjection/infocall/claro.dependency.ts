import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetInfoClaroController from '@controller/infocall/getClaro.controller';
import GetInfoClaroUseCase from '@feat/infocall/application/getInfoClaro.useCase';

container
  .register('Infocall.Claro.UseCase.GetInfo', GetInfoClaroUseCase)
  .addArgument(new Reference('Claro.Repository'));

container
  .register('Infocall.Claro.Controller.GetInfo', GetInfoClaroController)
  .addArgument(new Reference('Infocall.Claro.UseCase.GetInfo'));

export default container;
