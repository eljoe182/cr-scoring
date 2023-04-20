import { IBaseUseCase } from 'src/shared/domain';
import { IScoringRepository } from '../infrastructure/interface';

export default class GetScoringBulkUseCase implements IBaseUseCase {
  constructor(private repository: IScoringRepository<number[]>) {}
  public async execute(params: number[]): Promise<unknown> {
    return await this.repository.getInByPhoneNumber(params);
  }
}
