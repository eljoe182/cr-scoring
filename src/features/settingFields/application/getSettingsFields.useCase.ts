import { IBaseUseCase } from 'src/shared/domain/BaseUseCase';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';
import { IResultPagination } from '../../scoring/domain/interface/IResultPagination';
import { IParamsSettingsFields } from '../domain/interface/IParamsSettingsFields';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';

export default class GetSettingsFieldsUseCase implements IBaseUseCase {
  constructor(private readonly repository: ISettingsFieldsRepository) {}
  async execute(params: IParamsSettingsFields): Promise<IResultPagination<SettingsFields[]>> {
    return this.repository.getAllWithPagination(params);
  }
}
