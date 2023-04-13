import { IBaseUseCase } from '../../../shared/domain';
import { FieldConfig } from '../../../features/infocall/domain/contracts';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';

export default class SaveSettingsFieldsUseCase implements IBaseUseCase {
  constructor(private readonly repository: ISettingsFieldsRepository) {}
  async execute(fieldsConfig: FieldConfig) {
    return this.repository.save(fieldsConfig);
  }
}
