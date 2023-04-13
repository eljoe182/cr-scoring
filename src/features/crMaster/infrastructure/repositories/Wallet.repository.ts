import { DataSource } from 'typeorm';
import { CRWalletEntity } from 'src/shared/infrastructure/persistance/entities';
import { IWalletRepository } from '../interface';

export default class WalletRepository implements IWalletRepository<CRWalletEntity> {
  constructor(private orm: DataSource) {}

  public async getAllWallets(): Promise<CRWalletEntity[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(CRWalletEntity);
    const result = await repository.find();
    orm.destroy();
    return result;
  }
}
