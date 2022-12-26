import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetInfoBitel from '@controller/infocall/getBitel.controller';
import GetInfoBitelUseCase from '@feat/infocall/application/getInfoBitel.useCase';
import BitelRepository from '@feat/infocall/infrastructure/repositories/Bitel.repository';

container.register('Bitel.Repository', BitelRepository).addArgument(new Reference('DataSource.Infocall.Client'));

container.register('Infocall.Bitel.GetInfo', GetInfoBitelUseCase).addArgument(new Reference('Bitel.Repository'));

container
  .register('Controller.Infocall.GetInfoBitel', GetInfoBitel)
  .addArgument(new Reference('Infocall.Bitel.GetInfo'));

export default container;
