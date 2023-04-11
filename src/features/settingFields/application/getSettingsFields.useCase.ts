import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';
import { IResultPagination } from '../../scoring/domain/interface/IResultPagination';
import { IParamsSettingsFields } from '../domain/interface/IParamsSettingsFields';

export default class GetSettingsFieldsUseCase implements IBaseUseCase {
  constructor(private readonly repository: ISettingsFieldsRepository) {}
  async execute(params: IParamsSettingsFields): Promise<IResultPagination> {
    return this.repository.getAllWithPagination(params);
  }
}
