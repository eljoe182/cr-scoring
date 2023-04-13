import GetSettingsFieldsUseCase from '../../../../src/features/settingFields/application/getSettingsFields.useCase';
import { mockSettingsFieldsRepository } from '../../../shared/mocks/repositories/SettingsFieldsRepository.mock';
import { paramsResultSettingsFields } from '../../../shared/mocks/useCase/ResultSettingsFieldsUseCase.mock';
import { expectedResultSettingsFields } from '../../../shared/mocks/useCase/SettingsFieldsUseCase.mock';

describe('SettingsFields Use Case', () => {
  it('should return fields settings', async () => {
    // Given
    const mockRepository = mockSettingsFieldsRepository;
    const expectedResult = expectedResultSettingsFields;
    const params = paramsResultSettingsFields;
    // When
    const useCase = new GetSettingsFieldsUseCase(mockRepository);
    const result = await useCase.execute(params);

    // Then
    expect(result).toEqual(expectedResult);
  });
});
