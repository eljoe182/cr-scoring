import { IPagination } from './IPagination';

export interface IResultPagination<T> extends IPagination {
  rowsCount: number;
  rows: T;
}
