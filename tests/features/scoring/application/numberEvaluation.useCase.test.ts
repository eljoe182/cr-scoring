import NumberEvaluationUseCase from '../../../../src/features/scoring/application/numberEvaluation.useCase';
import { Server } from '../../../../src/app/server';
import {
  expectedResultNumberEvaluation,
  paramsNumberEvaluation,
} from '../../../shared/mocks/useCase/NumberEvaluationUseCase.mock';

describe('NumberEvaluation Use Case', () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server(3000);
    await server.start();
  });

  afterAll((done) => {
    done();
  });

  it('should return scoring result', async () => {
    // Given
    const params = paramsNumberEvaluation;
    const valuesExpected = expectedResultNumberEvaluation;

    // When
    const numberEvaluationUseCase = new NumberEvaluationUseCase();
    const result = await numberEvaluationUseCase.execute(params);

    // Then
    expect(result).toEqual(valuesExpected);
  });
});
