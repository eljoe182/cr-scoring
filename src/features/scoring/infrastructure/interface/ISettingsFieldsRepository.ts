import { FieldConfig } from '@feat/infocall/domain/contracts/FieldConfig';

export interface ISettingsFieldsRepository {
  saveSettingsFields(fieldsConfig: FieldConfig): Promise<unknown>;
}
