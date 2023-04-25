import { SetNumberEvaluationUseCaseParams } from '../../../../src/features/scoring/domain/contracts';
import { SetNumberEvaluationUseCase } from '../../../../src/features/scoring/application/SetNumberEvaluation.useCase';

describe('Set Number Evaluation', () => {
  it('should calculate score correctly returned 3', () => {
    const params: SetNumberEvaluationUseCaseParams = {
      data: {
        betterAttempt: '6.sin intento',
        betterAttemptValue: 0,
        betterManagement: 'NC',
        betterManagementDate: '1970-01-01T00:00:00.001Z',
        CD: 0,
        CNE: 0,
        deceased: 0,
        length: 9,
        NC: 1,
        phoneNumber: 900099138,
        talkTime: 0,
        totalManagement: 1,
        wrong: 0,
        operator: {
          operator: 'movistar',
          phoneNumber: 900099138,
          document: '4637804',
          fullName: 'FERNANDO HERBERT TORRES MENDOZA',
          model: '',
          origin: 'MOVISTAR MARZO 2023',
          activationDate: null,
          subscription: '',
          withWhatsapp: false,
          moreThanOne: true,
          originDate: new Date('2023-03-02'),
          createdAt: new Date('2023-04-05T23:00:48.000Z'),
          updatedAt: new Date('2023-04-05T23:00:48.000Z'),
        },
      },
      fields: [
        {
          campaign: 'IBK04',
          database: 'DB_CR_MAESTRA',
          tableName: 'RS_OP_FG_RESUMENFONO',
          field: 'MEJOR_GEST',
          condition: '=',
          valueCondition: 'NC',
          valueScore: 1,
          alias: 'field',
          columnName: 'MEJOR_GEST',
          columnType: 'varchar',
        },
        {
          campaign: 'IBK04',
          database: 'DB_CR_MAESTRA',
          tableName: 'RS_OP_FG_RESUMENFONO',
          field: 'MEJOR_INTEN',
          condition: '=',
          valueCondition: '6.SIN INTENTO',
          valueScore: 2,
          alias: 'betterAttempt',
          columnName: 'MEJOR_INTEN',
          columnType: 'varchar',
        },
      ],
    };

    const result = SetNumberEvaluationUseCase.execute(params);

    expect(result.score).toBe(3);
  });
});
