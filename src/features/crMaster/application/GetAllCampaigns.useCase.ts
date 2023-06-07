import { IBaseUseCase } from 'src/shared/domain/BaseUseCase';
import { IVicidialListsRepository } from '../infrastructure/interface';
import { VicidialLists } from 'src/shared/infrastructure/persistance/entities';

export default class GetAllCampaignsUseCase implements IBaseUseCase {
  constructor(private repository: IVicidialListsRepository<VicidialLists>) {}

  async execute() {
    const result = await this.repository.getVicidialLists();

    // get unique campaignId
    const campaignIds = result
      .map((item) => item.campaignId)
      .filter((value, index, self) => self.indexOf(value) === index);

    return campaignIds;
  }
}
