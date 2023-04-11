import { DataSource } from 'typeorm';
import { CRWalletEntity } from '../../../../shared/infrastructure/persistance/entities';
import { IWalletRepository } from '../interface/IWalletRepository';

export default class WalletRepository implements IWalletRepository {
  constructor(private orm: DataSource) {}

  public async getAllWallets(): Promise<CRWalletEntity[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(CRWalletEntity);
    const result = await repository.find();
    orm.destroy();
    return result;
  }
}
