import GetManagementHistory from '../../../../src/features/crMaster/application/GetManagementHistory.useCase';
import { mockManagementRepository } from '../../../shared/mocks/repositories/ManagementRepository.mock';
import { paramsGetHistoryUseCase } from '../../../shared/mocks/useCase/GetHistoryUseCase.mock';
import { mockSetOperatorUseCase } from '../../../shared/mocks/useCase/SetOperatorUseCase.mock';

describe('GetHistory Use Case', () => {
  it('should return history', async () => {
    // Given
    const mockRepository = mockManagementRepository;
    const mockSetOperator = mockSetOperatorUseCase;

    const params = paramsGetHistoryUseCase;

    // When
    const useCase = new GetManagementHistory(mockRepository, mockSetOperator);
    const result = await useCase.execute(params);

    // Then
    expect(result?.length).toBeGreaterThan(0);
    const resultFiltered = result?.find((item) => item.phoneNumber === 901448858);
    expect(resultFiltered?.operator).toBe('movistar');
  });
});
