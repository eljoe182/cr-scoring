import { CRWallet } from '@shared/domain/entities/CRMaster';

export interface IWalletRepository {
  getAllWallets(): Promise<CRWallet[]>;
}
