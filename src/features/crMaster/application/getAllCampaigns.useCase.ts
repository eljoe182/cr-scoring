import { IBaseUseCase } from 'src/shared/domain/BaseUseCase';
import { ICampaigns } from '../domain/interface/ICampaigns';
import { CRWalletEntity } from 'src/shared/infrastructure/persistance/entities';
import { IWalletRepository } from '../infrastructure/interface/IWalletRepository';

export default class GetAllCampaignsUseCase implements IBaseUseCase {
  constructor(private repository: IWalletRepository<CRWalletEntity>) {}

  async execute(): Promise<ICampaigns[]> {
    return this.repository.getAllWallets();
  }
}
