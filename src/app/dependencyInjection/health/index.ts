import container from '../../../shared/infrastructure/dependency';

import GetStatusController from '../../controllers/health/getStatus.controller';

container.register('Controller.Health.GetStatus', GetStatusController);

export default container;
