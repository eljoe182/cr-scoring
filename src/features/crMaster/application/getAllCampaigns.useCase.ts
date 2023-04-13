import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { ICampaigns } from '../domain/interface/ICampaigns';
import { CRWalletEntity } from '../../../shared/infrastructure/persistance/entities';
import { IWalletRepository } from '../infrastructure/interface/IWalletRepository';

export default class GetAllCampaignsUseCase implements IBaseUseCase {
  constructor(private repository: IWalletRepository<CRWalletEntity>) {}

  async execute(): Promise<ICampaigns[]> {
    return this.repository.getAllWallets();
  }
}
