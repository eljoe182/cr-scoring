import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';
import { FieldConfig } from 'src/features/infocall/domain/contracts';
import { IResultPagination } from 'src/features/scoring/domain/interface';
import { ResponseRepositoryContract } from 'src/shared/domain/contracts';

export interface ISettingsFieldsRepository<T = unknown> {
  save(params: FieldConfig): Promise<ResponseRepositoryContract>;
  getAllWithPagination(params: T): Promise<IResultPagination<SettingsFields[]>>;
  getAll(): Promise<ResponseRepositoryContract>;
  destroy(id: string): Promise<ResponseRepositoryContract>;
}
