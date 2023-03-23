import { CRWallet } from '@shared/domain/entities/CRMaster';
import { DataSource } from 'typeorm';
import { IWalletRepository } from '../interface/IWalletRepository';

export default class WalletRepository implements IWalletRepository {
  constructor(private orm: DataSource) {}

  public async getAllWallets(): Promise<CRWallet[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(CRWallet);
    const result = await repository.find();
    orm.destroy();
    return result;
  }
}
