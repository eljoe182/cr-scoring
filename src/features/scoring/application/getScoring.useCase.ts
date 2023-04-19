import { IBaseUseCase } from 'src/shared/domain';
import { GetScoringParams } from '../domain/contracts/IGetScoringParams';

export default class GetScoringUseCase implements IBaseUseCase {
  constructor(
    private readonly managementHistoryUseCase: IBaseUseCase
  ) {}

  async execute(params: GetScoringParams) {
    const managementHistory = await this.managementHistoryUseCase.execute(params);
    if (!managementHistory) {
      return null;
    }

    return managementHistory;
  }
}
