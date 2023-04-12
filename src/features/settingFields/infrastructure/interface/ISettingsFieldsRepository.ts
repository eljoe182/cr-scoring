import { FieldConfig } from '../../../../features/infocall/domain/contracts/FieldConfig';
import { IPagination } from '../../../../features/scoring/domain/interface/IPagination';
import { IResultPagination } from '../../../../features/scoring/domain/interface/IResultPagination';
import { ResponseRepositoryContract } from '../../../../shared/domain/contracts/ResponseRepository.contracts';

export interface ISettingsFieldsRepository {
  save(fieldsConfig: FieldConfig): Promise<ResponseRepositoryContract>;
  getAllWithPagination(pagination: IPagination): Promise<IResultPagination>;
  getAll(): Promise<ResponseRepositoryContract>;
  destroy(id: string): Promise<ResponseRepositoryContract>;
}
