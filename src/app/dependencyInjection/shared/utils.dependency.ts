import container from 'src/shared/infrastructure/dependency';

import WinstonLogger from 'src/shared/infrastructure/logger/WinstonLogger';
import Pagination from 'src/shared/domain/Pagination';

container.register('Logger', WinstonLogger);
container.register('Utils.Pagination', Pagination);

export default container;
