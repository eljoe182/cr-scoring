import { IBaseUseCase } from 'src/shared/domain/BaseUseCase';
import { IVicidialListsRepository } from '../infrastructure/interface';
import { VicidialLists } from 'src/shared/infrastructure/persistance/entities';

export default class GetVicidialListsUseCase implements IBaseUseCase {
  constructor(private vicidialListsRepository: IVicidialListsRepository<VicidialLists>) {}
  public async execute(): Promise<unknown> {
    const result = await this.vicidialListsRepository.getVicidialLists();

    // group by core
    const core1 = result.filter((item) => item.core === 'CORE1');
    const core11 = result.filter((item) => item.core === 'CORE11');
    const core21 = result.filter((item) => item.core === 'CORE21');

    return {
      core1,
      core11,
      core21,
    };
  }
}
