import { FieldConfig } from '@feat/infocall/domain/contracts/FieldConfig';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';

export default class SaveSettingsFieldsUseCase implements IBaseUseCase {
  constructor(private readonly repository: ISettingsFieldsRepository) {}
  async execute(fieldsConfig: FieldConfig[]) {
    const result = await Promise.allSettled(
      fieldsConfig.map(async (config) => this.repository.saveSettingsFields(config))
    );
    return result;
  }
}