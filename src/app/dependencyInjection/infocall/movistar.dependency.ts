import { Reference } from 'node-dependency-injection';
import container from '@shared/infrastructure/dependency';

import GetInfoMovistarController from '@app/controllers/infocall/getMovistar.controller';
import MovistarRepository from '@feat/infocall/infrastructure/repositories/Movistar.repository';
import GetInfoMovistarUseCase from '@feat/infocall/application/getInfoMovistar.useCase';

container.register('Movistar.Repository', MovistarRepository).addArgument(new Reference('DataSource.Infocall.Client'));

container
  .register('Infocall.Movistar.UseCase.GetInfo', GetInfoMovistarUseCase)
  .addArgument(new Reference('Movistar.Repository'));

container
  .register('Infocall.Movistar.Controller.GetInfo', GetInfoMovistarController)
  .addArgument(new Reference('Infocall.Movistar.UseCase.GetInfo'));

export default container;
