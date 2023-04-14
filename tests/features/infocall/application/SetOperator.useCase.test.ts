import SetOperatorUseCase from '../../../../src/features/infocall/application/SetOperator.useCase';
import { mockBitelRepository } from '../../../shared/mocks/repositories/BitelRepository.mock';
import { mockClaroRepository } from '../../../shared/mocks/repositories/ClaroRepository.mock';
import { mockEntelRepository } from '../../../shared/mocks/repositories/EntelRepository.mock';
import { mockMovistarRepository } from '../../../shared/mocks/repositories/MovistarRepository.mock';
import {
  expectedValueSetOperatorUseCase,
  paramsSetOperatorUseCase,
} from '../../../shared/mocks/useCase/SetOperatorUseCase.mock';

describe('Set Operator Use Case', () => {
  it('should return history', async () => {
    // Given
    const params = paramsSetOperatorUseCase;

    const bitelRepository = mockBitelRepository;
    const claroRepository = mockClaroRepository;
    const entelRepository = mockEntelRepository;
    const movistarRepository = mockMovistarRepository;

    const expectedValue = expectedValueSetOperatorUseCase;

    // When
    const useCase = new SetOperatorUseCase(bitelRepository, claroRepository, entelRepository, movistarRepository);
    const operator = await useCase.execute(params);

    // Then
    expect(operator).toEqual(expectedValue);
  });
});
