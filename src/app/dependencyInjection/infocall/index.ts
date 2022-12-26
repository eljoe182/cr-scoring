import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetInfoBitelController from '@controller/infocall/getBitel.controller';
import GetInfoBitelUseCase from '@feat/infocall/application/getInfoBitel.useCase';
import BitelRepository from '@feat/infocall/infrastructure/repositories/Bitel.repository';

import GetInfoClaroController from '@controller/infocall/getClaro.controller';
import ClaroRepository from '@feat/infocall/infrastructure/repositories/Claro.repository';
import GetInfoClaroUseCase from '@feat/infocall/application/getInfoClaro.useCase';

import GetInfoEntelController from '@controller/infocall/getEntel.controller';
import EntelRepository from '@feat/infocall/infrastructure/repositories/Entel.repository';
import GetInfoEntelUseCase from '@feat/infocall/application/getInfoEntel.useCase';
import MovistarRepository from '@feat/infocall/infrastructure/repositories/Movistar.repository';
import GetInfoMovistarUseCase from '@feat/infocall/application/getInfoMovistar.useCase';
import GetInfoMovistarController from '@app/controllers/infocall/getMovistar.controller';

container.register('Bitel.Repository', BitelRepository).addArgument(new Reference('DataSource.Infocall.Client'));
container.register('Claro.Repository', ClaroRepository).addArgument(new Reference('DataSource.Infocall.Client'));
container.register('Entel.Repository', EntelRepository).addArgument(new Reference('DataSource.Infocall.Client'));
container.register('Movistar.Repository', MovistarRepository).addArgument(new Reference('DataSource.Infocall.Client'));

container
  .register('Infocall.Bitel.UseCase.GetInfo', GetInfoBitelUseCase)
  .addArgument(new Reference('Bitel.Repository'));
container
  .register('Infocall.Claro.UseCase.GetInfo', GetInfoClaroUseCase)
  .addArgument(new Reference('Claro.Repository'));
container
  .register('Infocall.Entel.UseCase.GetInfo', GetInfoEntelUseCase)
  .addArgument(new Reference('Entel.Repository'));
container
  .register('Infocall.Movistar.UseCase.GetInfo', GetInfoMovistarUseCase)
  .addArgument(new Reference('Movistar.Repository'));

container
  .register('Infocall.Bitel.Controller.GetInfo', GetInfoBitelController)
  .addArgument(new Reference('Infocall.Bitel.UseCase.GetInfo'));

container
  .register('Infocall.Claro.Controller.GetInfo', GetInfoClaroController)
  .addArgument(new Reference('Infocall.Claro.UseCase.GetInfo'));

container
  .register('Infocall.Entel.Controller.GetInfo', GetInfoEntelController)
  .addArgument(new Reference('Infocall.Entel.UseCase.GetInfo'));

container
  .register('Infocall.Movistar.Controller.GetInfo', GetInfoMovistarController)
  .addArgument(new Reference('Infocall.Movistar.UseCase.GetInfo'));

export default container;
