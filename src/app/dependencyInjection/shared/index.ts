import container from '@shared/infrastructure/dependency';
import WinstonLogger from '@shared/infrastructure/logger/WinstonLogger';

container.register('Logger', WinstonLogger);

export default container;
