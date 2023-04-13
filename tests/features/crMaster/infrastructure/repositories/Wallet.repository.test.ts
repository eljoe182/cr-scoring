import { Connection, createConnection } from 'typeorm';
import { Server } from '../../../../../src/app/server';
import { TransactionalTestContext } from 'typeorm-transactional-tests';
import { WalletRepository } from '../../../../../src/features/crMaster/infrastructure/repositories';
import { CRMasterConfig } from '../../../../../src/shared/infrastructure/persistance/mssql';

describe('Wallet Repository', () => {
  const server = new Server(3000);
  let connection: Connection;
  let transactionalContext: TransactionalTestContext;

  beforeAll(async () => {
    await server.start();
    const config = new CRMasterConfig();
    connection = await createConnection(config.getDataSourceOptions());
    transactionalContext = new TransactionalTestContext(connection);
    await transactionalContext.start();
  });

  afterAll(async () => {
    await transactionalContext.finish();
    await connection.close();
    await server.stop();
  });

  it('should do something with the repository', async () => {
    const walletRepository = new WalletRepository(connection);
    const wallets = await walletRepository.getAllWallets();
    expect(wallets).toHaveLength(0);
  });
});
