import { Reference } from 'node-dependency-injection';
import container from '../../../shared/infrastructure/dependency';

import ExportToCSVController from '../../../app/controllers/exporter/exportToCSV.controller';
import ExportToCSVUseCase from '../../../features/exporter/application/exportToCSV.useCase';
import ExportRepository from '../../../features/exporter/infrastructure/repositories/ExportRepository';

container.register('Exporter.Repository', ExportRepository);

container
  .register('Exporter.Vicidial.UseCase.CSV', ExportToCSVUseCase)
  .addArgument(new Reference('Exporter.Repository'));

container
  .register('Exporter.Vicidial.Controller.CSV', ExportToCSVController)
  .addArgument(new Reference('Exporter.Vicidial.UseCase.CSV'));

export default container;
