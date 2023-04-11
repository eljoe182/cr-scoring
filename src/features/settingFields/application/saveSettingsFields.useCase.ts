import { FieldConfig } from '../../../features/infocall/domain/contracts/FieldConfig';
import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';

export default class SaveSettingsFieldsUseCase implements IBaseUseCase {
  constructor(private readonly repository: ISettingsFieldsRepository) {}
  async execute(fieldsConfig: FieldConfig) {
    return this.repository.save(fieldsConfig);
  }
}
