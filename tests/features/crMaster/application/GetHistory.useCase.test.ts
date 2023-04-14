import GetHistoryUseCase from '../../../../src/features/crMaster/application/GetHistory.useCase';
import { mockManagementRepository } from '../../../shared/mocks/repositories/ManagementRepository.mock';
import { paramsGetHistoryUseCase } from '../../../shared/mocks/useCase/GetHistoryUseCase.mock';
import { mockNumberEvaluationUseCase } from '../../../shared/mocks/useCase/NumberEvaluationUseCase.mock';
import { mockSetOperatorUseCase } from '../../../shared/mocks/useCase/SetOperatorUseCase.mock';
import { mockSettingsFieldsUseCase } from '../../../shared/mocks/useCase/SettingsFieldsUseCase.mock';

describe('GetHistory Use Case', () => {
  it('should return history', async () => {
    // Given
    const mockRepository = mockManagementRepository;
    const mockSetOperator = mockSetOperatorUseCase;
    const mockNumberEvaluation = mockNumberEvaluationUseCase;
    const mockSettingsFields = mockSettingsFieldsUseCase;

    const params = paramsGetHistoryUseCase;

    // When
    const useCase = new GetHistoryUseCase(mockRepository, mockSetOperator, mockNumberEvaluation, mockSettingsFields);
    const result = await useCase.execute(params);

    // Then
    expect(result?.success.length).toBeGreaterThan(0);
    const resultFiltered = result?.success.find((item) => item.phoneNumber === '901448858');
    expect(resultFiltered?.score).toBe(20);
  });
});
