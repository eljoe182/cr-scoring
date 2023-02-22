import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IManagementHistoryRepository } from '../infrastructure/interface/IManagementHistoryRepository';
import { FilterManagementHistory } from '../domain/class/FilterManagementHistory';
import { ManagementHistory } from '@shared/domain/entities/CRMaster/FRManagmentHistory.entity';

export default class GetHistoryUseCase implements IBaseUseCase {
  constructor(private repository: IManagementHistoryRepository) {}

  async execute(params: FilterManagementHistory): Promise<ManagementHistory[]> {
    return this.repository.getManagementHistory(params);
  }
}
