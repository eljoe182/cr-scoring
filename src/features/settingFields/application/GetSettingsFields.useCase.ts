import { IBaseUseCase } from 'src/shared/domain/BaseUseCase';
import { ISettingsFieldsRepository } from '../infrastructure/interface/ISettingsFieldsRepository';
import { IResultPagination } from '../../../shared/infrastructure/interfaces/IResultPagination';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';
import { GetSettingsFieldsUseCaseParams } from '../domain/interface/ISettingsFieldsParams';

export default class GetSettingsFieldsUseCase implements IBaseUseCase<GetSettingsFieldsUseCaseParams> {
  constructor(
    private readonly repository: ISettingsFieldsRepository<
      GetSettingsFieldsUseCaseParams,
      IResultPagination<SettingsFields[]>
    >
  ) {}
  async execute(params: GetSettingsFieldsUseCaseParams): Promise<IResultPagination<SettingsFields[]>> {
    return this.repository.getAllWithPagination(params);
  }
}
