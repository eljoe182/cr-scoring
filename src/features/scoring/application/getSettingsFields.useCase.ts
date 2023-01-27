import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';
import { IPagination } from '../domain/interface/IPagination';
import { IResultPagination } from '../domain/interface/IResultPagination';

export default class GetSettingsFieldsUseCase implements IBaseUseCase {
  constructor(private readonly repository: ISettingsFieldsRepository) {}
  async execute(pagination: IPagination): Promise<IResultPagination> {
    return this.repository.getAllWithPagination(pagination);
  }
}
