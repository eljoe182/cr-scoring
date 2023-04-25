import { Evaluation, EvaluationParams } from '../../../../src/features/scoring/domain/class/Evaluation';
import { EvaluationResult } from '../../../../src/features/scoring/domain/contracts';

describe('Evaluation Number', () => {
  it('should get 20 scoring', () => {
    // Given
    const params: EvaluationParams<EvaluationResult> = {
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
    expect(result).toBe(20);
  });

  it('should evaluate operator', () => {
    // Given
    const params: EvaluationParams<EvaluationResult> = {
      operator: 'claro',
      score: 0,
      entries: [
        ['operator', 'claro'],
        ['phoneNumber', '900881598'],
        ['document', '41778590'],
        ['fullName', 'JUDITH ROSA MEDRANO CARHUAMACA'],
        ['model', ''],
        ['origin', 'CLARO DICIEMBRE 2021'],
        ['activationDate', null],
        ['subscription', ''],
        ['withWhatsapp', false],
        ['moreThanOne', '0'],
        ['originDate', '2021-12-10'],
        ['createdAt', '2023-03-07T23:12:50.000Z'],
        ['updatedAt', null],
      ],
      data: [
        {
          campaign: 'IBK04',
          condition: '=',
          database: 'infocall',
          field: 'with_whatsapp',
          tableName: 'bitel',
          valueCondition: false,
          valueScore: 5,
          alias: 'withWhatsapp',
          columnName: 'with_whatsapp',
          columnType: 'tinyint',
        },
        {
          campaign: 'IBK04',
          condition: '=',
          database: 'infocall',
          field: 'with_whatsapp',
          tableName: 'claro',
          valueCondition: false,
          valueScore: 6,
          alias: 'withWhatsapp',
          columnName: 'with_whatsapp',
          columnType: 'tinyint',
        },
        {
          campaign: 'IBK04',
          condition: '=',
          database: 'infocall',
          field: 'with_whatsapp',
          tableName: 'entel',
          valueCondition: false,
          valueScore: 7,
          alias: 'withWhatsapp',
          columnName: 'with_whatsapp',
          columnType: 'tinyint',
        },
        {
          campaign: 'IBK04',
          condition: '=',
          database: 'infocall',
          field: 'with_whatsapp',
          tableName: 'movistar',
          valueCondition: false,
          valueScore: 3,
          alias: 'withWhatsapp',
          columnName: 'with_whatsapp',
          columnType: 'tinyint',
        },
      ],
    };

    // When
    const result = Evaluation.getScore(params);

    // Then
    expect(result).toBe(6);
  });

  it('should evaluate info', () => {
    // Given
    const params: EvaluationParams<EvaluationResult> = {
      score: 0,
      entries: [
        ['betterAttempt', '1.intento valor'],
        ['betterAttemptValue', 1],
        ['betterManagement', 'NC'],
        ['betterManagementDate', '1970-01-01T00:00:00.001Z'],
        ['CD', 0],
        ['CNE', 0],
        ['deceased', 0],
        ['length', 9],
        ['NC', 1],
        ['phoneNumber', 900881598],
        ['talkTime', 0],
        ['totalManagement', 1],
        ['wrong', 0],
        [
          'operator',
          {
            operator: 'claro',
            phoneNumber: 900881598,
            document: '41778590',
            fullName: 'JUDITH ROSA MEDRANO CARHUAMACA',
            model: '',
            origin: 'CLARO DICIEMBRE 2021',
            activationDate: null,
            subscription: '',
            withWhatsapp: false,
            moreThanOne: '0',
            originDate: '2021-12-10',
            createdAt: '2023-03-07T23:12:50.000Z',
            updatedAt: null,
          },
        ],
      ],
      data: [
        {
          campaign: 'IBK04',
          condition: '=',
          database: 'DB_CR_MAESTRA',
          field: 'MEJOR_INTEN',
          tableName: 'RS_OP_FG_RESUMENFONO',
          valueCondition: '1.intento valor',
          valueScore: 2,
          alias: 'beastTry',
          columnName: 'MEJOR_INTEN',
          columnType: 'nvarchar',
        },
        {
          campaign: 'IBK04',
          condition: '=',
          database: 'DB_CR_MAESTRA',
          field: 'MEJOR_GEST',
          tableName: 'RS_OP_FG_RESUMENFONO',
          valueCondition: 'CD',
          valueScore: 10,
          alias: 'betterManagement',
          columnName: 'MEJOR_GEST',
          columnType: 'nvarchar',
        },
        {
          campaign: 'IBK04',
          condition: '=',
          database: 'DB_CR_MAESTRA',
          field: 'MEJOR_GEST',
          tableName: 'RS_OP_FG_RESUMENFONO',
          valueCondition: 'NC',
          valueScore: 1,
          alias: 'betterManagement',
          columnName: 'MEJOR_GEST',
          columnType: 'nvarchar',
        },
      ],
    };

    // When
    const result = Evaluation.getScore(params);

    // Then
    expect(result).toBe(1);
  });
});
