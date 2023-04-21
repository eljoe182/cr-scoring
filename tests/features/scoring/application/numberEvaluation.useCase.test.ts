import { Evaluation, EvaluationParams } from '../../../../src/features/scoring/domain/class/Evaluation';

describe('Evaluation Number', () => {
  it('should get 20 scoring', () => {
    // Given
    const params: EvaluationParams = {
      score: 0,
      entries: [
        ['field', 'value1'],
        ['database', 'value2'],
      ],
      data: [
        {
          campaign: 'campaign1',
          columnName: 'field1',
          columnType: 'number',
          database: 'database1',
          field: 'field1',
          tableName: 'table1',
          alias: 'field',
          condition: '=',
          valueCondition: 'value1',
          valueScore: 10,
        },
        {
          campaign: 'campaign1',
          columnName: 'field1',
          columnType: 'number',
          database: 'database1',
          field: 'field1',
          tableName: 'table1',
          alias: 'database',
          condition: '<>',
          valueCondition: 'value2',
          valueScore: 10,
        },
      ],
    };

    // When
    const result = Evaluation.getScore(params);

    // Then
    expect(result).toBe(10);
  });
});
