import { ResponseRepositoryBase } from 'src/shared/domain/contracts';

export interface ISettingsFieldsRepository<P = unknown, R = unknown> {
  save(params: P): Promise<ResponseRepositoryBase<R>>;
  getAllWithPagination(params: P): Promise<R>;
  getAll(): Promise<ResponseRepositoryBase<R>>;
  destroy(id: string): Promise<ResponseRepositoryBase<R>>;
}
