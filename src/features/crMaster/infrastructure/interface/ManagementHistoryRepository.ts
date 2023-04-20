export interface IManagementHistoryRepository<P = unknown, R = unknown> {
  getManagementHistory(params: P): Promise<R[]>;
}
