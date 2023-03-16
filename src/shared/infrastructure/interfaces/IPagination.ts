export type PaginationResult = {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  success: unknown[];
};

export default interface IPagination {
  getPaginatedItems: (items: unknown[], page: number, pageSize: number) => PaginationResult;
}
