import { Reference } from 'node-dependency-injection';
import container from 'src/shared/infrastructure/dependency';

import ExportToCSVController from 'src/app/controllers/exporter/ExportToCSV.controller';
import ExportToCSVUseCase from 'src/features/exporter/application/ExportToCSV.useCase';
import ExportRepository from 'src/features/exporter/infrastructure/repositories/ExportRepository';

container.register('Exporter.Repository', ExportRepository);

container
  .register('Exporter.Vicidial.UseCase.CSV', ExportToCSVUseCase)
  .addArgument(new Reference('Exporter.Repository'));

container
  .register('Exporter.Vicidial.Controller.CSV', ExportToCSVController)
  .addArgument(new Reference('Exporter.Vicidial.UseCase.CSV'));

export default container;
