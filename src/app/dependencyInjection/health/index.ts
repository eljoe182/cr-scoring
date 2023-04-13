import container from 'src/shared/infrastructure/dependency';

import GetStatusController from 'src/app/controllers/health/getStatus.controller';

container.register('Controller.Health.GetStatus', GetStatusController);

export default container;
