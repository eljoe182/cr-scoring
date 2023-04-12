import { CRWallet } from '../../../../shared/infrastructure/persistance/entities';

export interface IWalletRepository {
  getAllWallets(): Promise<CRWallet[]>;
}
