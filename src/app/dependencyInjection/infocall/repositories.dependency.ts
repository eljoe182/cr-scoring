import { Reference } from 'node-dependency-injection';
import container from '../../../shared/infrastructure/dependency';

import BitelRepository from '../../../features/infocall/infrastructure/repositories/Bitel.repository';
import ClaroRepository from '../../../features/infocall/infrastructure/repositories/Claro.repository';
import EntelRepository from '../../../features/infocall/infrastructure/repositories/Entel.repository';
import MovistarRepository from '../../../features/infocall/infrastructure/repositories/Movistar.repository';

container.register('Bitel.Repository', BitelRepository).addArgument(new Reference('DataSource.Infocall.Client'));
container.register('Claro.Repository', ClaroRepository).addArgument(new Reference('DataSource.Infocall.Client'));
container.register('Entel.Repository', EntelRepository).addArgument(new Reference('DataSource.Infocall.Client'));
container.register('Movistar.Repository', MovistarRepository).addArgument(new Reference('DataSource.Infocall.Client'));

export default container;
