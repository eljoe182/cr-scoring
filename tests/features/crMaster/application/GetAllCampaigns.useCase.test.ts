import GetAllCampaignsUseCase from '../../../../src/features/crMaster/application/getAllCampaigns.useCase';
import { mockWalletRepository } from '../../../shared/mocks/repositories/WalletRepository.mock';

describe('GetAllCampaigns Use Case', () => {
  it('should return all wallets', async () => {
    // Given
    const mockRepository = mockWalletRepository;

    // When
    const useCase = new GetAllCampaignsUseCase(mockRepository);
    const campaigns = await useCase.execute();

    // Then
    expect(campaigns).toHaveLength(1);
  });
});
