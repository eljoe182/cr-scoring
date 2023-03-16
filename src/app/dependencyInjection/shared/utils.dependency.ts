import container from '@shared/infrastructure/dependency';

import WinstonLogger from '@shared/infrastructure/logger/WinstonLogger';
import Pagination from '@shared/domain/Pagination';

container.register('Logger', WinstonLogger);
container.register('Utils.Pagination', Pagination);

export default container;
