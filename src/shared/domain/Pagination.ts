import IPagination, { PaginationResult } from '../../shared/infrastructure/interfaces/IPagination';
import lo from 'lodash';

export default class Pagination implements IPagination {
  public getPaginatedItems(items: unknown[], page: number, pageSize: number): PaginationResult {
    const pg = page || 1;
    const pgSize = pageSize || 100;
    const offset = (pg - 1) * pgSize;
    const pagedItems = lo.drop(items, offset).slice(0, pgSize);
    return {
      page: pg,
      size: pgSize,
      total: items.length,
      totalPages: Math.ceil(items.length / pgSize),
      success: pagedItems,
    };
  }
}
