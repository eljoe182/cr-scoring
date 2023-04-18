import { IBaseUseCase } from 'src/shared/domain';
import { ParamsGetScoring } from '../domain/contracts/ParamsGetScoring';

export default class GetScoringUseCase implements IBaseUseCase {
  constructor(
    private readonly managementHistoryUseCase: IBaseUseCase
  ) {}

  async execute(params: ParamsGetScoring) {
    const managementHistory = await this.managementHistoryUseCase.execute(params);
    if (!managementHistory) {
      return null;
    }

    return managementHistory;
  }
}
