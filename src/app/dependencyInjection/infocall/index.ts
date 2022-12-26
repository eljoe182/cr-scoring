import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetInfoBitel from '@controller/infocall/getBitel.controller';
import GetInfoBitelUseCase from '@feat/infocall/application/getInfoBitel.useCase';
import BitelRepository from '@feat/infocall/infrastructure/repositories/Bitel.repository';
import ClaroRepository from '@feat/infocall/infrastructure/repositories/Claro.repository';
import GetInfoClaroUseCase from '@feat/infocall/application/getInfoClaro.useCase';

container.register('Bitel.Repository', BitelRepository).addArgument(new Reference('DataSource.Infocall.Client'));
container.register('Claro.Repository', ClaroRepository).addArgument(new Reference('DataSource.Infocall.Client'));

container.register('Infocall.Bitel.GetInfo', GetInfoBitelUseCase).addArgument(new Reference('Bitel.Repository'));
container.register('Infocall.Claro.GetInfo', GetInfoClaroUseCase).addArgument(new Reference('Claro.Repository'));

container
  .register('Controller.Infocall.GetInfoBitel', GetInfoBitel)
  .addArgument(new Reference('Infocall.Bitel.GetInfo'));

  container
  .register('Controller.Infocall.GetInfoClaro', GetInfoBitel)
  .addArgument(new Reference('Infocall.Claro.GetInfo'));

export default container;
