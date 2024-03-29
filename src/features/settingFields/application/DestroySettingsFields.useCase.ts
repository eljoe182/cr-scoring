import { IBaseUseCase } from 'src/shared/domain/BaseUseCase';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';

export default class DestroySettingsFieldsUseCase implements IBaseUseCase {
  constructor(private readonly repository: ISettingsFieldsRepository) {}
  async execute(id: string) {
    return this.repository.destroy(id);
  }
}
