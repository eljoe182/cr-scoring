import { IBaseUseCase } from 'src/shared/domain';
import { IExportRepository } from '../infrastructure/interface/IExportRepository';

export default class ExportToCSVUseCase implements IBaseUseCase {
  constructor(private readonly exportRepository: IExportRepository) {}

  async execute(data: unknown): Promise<unknown> {
    const csv = await this.exportRepository.vicidialDataExportToCSV(data);
    return csv;
  }
}
