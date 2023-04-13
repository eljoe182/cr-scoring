import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { IVicidialListsRepository } from '../infrastructure/interface';

export default class GetVicidialListsUseCase implements IBaseUseCase {
  constructor(private vicidialListsRepository: IVicidialListsRepository) {}
  public async execute(): Promise<unknown> {
    return this.vicidialListsRepository.getVicidialLists();
  }
}
