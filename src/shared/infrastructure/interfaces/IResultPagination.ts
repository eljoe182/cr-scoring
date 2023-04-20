export interface IResultPagination<T> {
  page: number;
  limit: number;
  rowsCount: number;
  rows: T;
}
