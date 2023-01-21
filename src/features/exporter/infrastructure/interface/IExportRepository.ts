export interface IExportRepository {
  vicidialDataExportToCSV(data: unknown): Promise<unknown>;
}
