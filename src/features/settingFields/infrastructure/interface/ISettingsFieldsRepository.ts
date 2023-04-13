import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';
import { FieldConfig } from 'src/features/infocall/domain/contracts';
import { IPagination, IResultPagination } from 'src/features/scoring/domain/interface';
import { ResponseRepositoryContract } from 'src/shared/domain/contracts';

export interface ISettingsFieldsRepository {
  save(fieldsConfig: FieldConfig): Promise<ResponseRepositoryContract>;
  getAllWithPagination(pagination: IPagination): Promise<IResultPagination<SettingsFields[]>>;
  getAll(): Promise<ResponseRepositoryContract>;
  destroy(id: string): Promise<ResponseRepositoryContract>;
}
