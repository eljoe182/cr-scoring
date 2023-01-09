import { IPagination } from './IPagination';

export interface IResultPagination extends IPagination {
  rowsCount: number;
  rows: unknown;
}
