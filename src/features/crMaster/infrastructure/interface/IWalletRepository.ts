import { CRWallet } from '@shared/infrastructure/persistance/entities/CRMaster';

export interface IWalletRepository {
  getAllWallets(): Promise<CRWallet[]>;
}
