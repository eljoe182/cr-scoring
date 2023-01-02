import { FieldConfig } from '@feat/infocall/domain/contracts/FieldConfig';
import { IResponseRepository } from '@shared/domain/contracts/ResponseRepository.contracts';

export interface ISettingsFieldsRepository {
  saveSettingsFields(fieldsConfig: FieldConfig): Promise<IResponseRepository>;
  getSettingsFields(): Promise<IResponseRepository>;
  destroySettingsFields(id: string): Promise<IResponseRepository>;
}
