import { FieldConfig } from '@feat/infocall/domain/contracts/FieldConfig';
import { ResponseRepositoryContract } from '@shared/domain/contracts/ResponseRepository.contracts';

export interface ISettingsFieldsRepository {
  saveSettingsFields(fieldsConfig: FieldConfig): Promise<ResponseRepositoryContract>;
  getSettingsFields(): Promise<ResponseRepositoryContract>;
  destroySettingsFields(id: string): Promise<ResponseRepositoryContract>;
}
