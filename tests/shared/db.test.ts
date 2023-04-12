import { CRMasterClient, CRMasterConfig } from '../../src/shared/infrastructure/persistance/mssql';
import WalletRepository from '../../src/features/crMaster/infrastructure/repositories/Wallet.repository';

describe('WalletRepository', () => {
  let walletRepository: WalletRepository;
  beforeEach(async () => {
    const crMasterConfig = new CRMasterConfig();
    const crMasterClient = new CRMasterClient(crMasterConfig);
    const initialize = await crMasterClient.initialize();
    walletRepository = new WalletRepository(initialize);
  });

  describe('getAllWallets', () => {
    it('should return all wallets', async () => {
      const wallets = await walletRepository.getAllWallets();
      expect(wallets).toHaveLength(2);
    });
  })
});
