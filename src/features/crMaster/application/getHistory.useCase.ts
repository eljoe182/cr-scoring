import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IManagementHistoryRepository } from '../infrastructure/interface/IManagementHistoryRepository';
import { FilterManagementHistory } from '../domain/class/FilterManagementHistory';
import { IManagementHistoryResult } from '../domain/interface/IManagementHistoryResult';

export default class GetHistoryUseCase implements IBaseUseCase {
  constructor(private repository: IManagementHistoryRepository) {}

  async execute(params: FilterManagementHistory): Promise<IManagementHistoryResult[]> {
    return this.repository.getManagementHistory(params);
  }
}
