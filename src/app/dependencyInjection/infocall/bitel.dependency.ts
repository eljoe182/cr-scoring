import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetInfoBitelController from '@controller/infocall/getBitel.controller';
import GetInfoBitelUseCase from '@feat/infocall/application/getInfoBitel.useCase';
import BitelRepository from '@feat/infocall/infrastructure/repositories/Bitel.repository';


container.register('Bitel.Repository', BitelRepository).addArgument(new Reference('DataSource.Infocall.Client'));

container
  .register('Infocall.Bitel.UseCase.GetInfo', GetInfoBitelUseCase)
  .addArgument(new Reference('Bitel.Repository'));

container
  .register('Infocall.Bitel.Controller.GetInfo', GetInfoBitelController)
  .addArgument(new Reference('Infocall.Bitel.UseCase.GetInfo'));

export default container;
