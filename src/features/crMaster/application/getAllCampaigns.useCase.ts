import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IWalletRepository } from '../infrastructure/interface/IWalletRepository';

export default class GetAllCampaignsUseCase implements IBaseUseCase {
  constructor(private repository: IWalletRepository) {}

  async execute(): Promise<unknown> {
    return this.repository.getAllWallets();
  }
}
