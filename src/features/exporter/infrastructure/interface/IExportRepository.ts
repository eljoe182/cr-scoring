export interface IExportRepository<P = unknown, R = unknown> {
  vicidialDataExportToCSV(data: P): Promise<R>;
}
