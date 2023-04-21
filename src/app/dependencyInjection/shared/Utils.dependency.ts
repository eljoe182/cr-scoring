import container from 'src/shared/infrastructure/dependency';

import WinstonLogger from 'src/shared/infrastructure/logger/WinstonLogger';

container.register('Logger', WinstonLogger);

export default container;
