export interface IManagementHistoryRepository<T = unknown> {
  getManagementHistory(params: unknown): Promise<T[]>;
}
