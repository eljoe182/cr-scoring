import NumberEvaluationUseCase from '../../../../src/features/scoring/application/numberEvaluation.useCase';
import { DataPeriodContract } from '../../../../src/features/scoring/domain/contracts/DataPeriod.contract';
import { ParamsNumberEvaluationContract } from '../../../../src/features/scoring/domain/contracts/NumberEvaluation.contract';
import { SettingsFieldsContract } from '../../../../src/features/settingFields/domain/contracts/SettingsFields.contract';
import { Server } from '../../../../src/app/server'

describe('NumberEvaluationUseCase', () => {
  it('should return scoring result', async () => {
    const server = new Server(3000);
    await server.start()

    // Given
    const dataPeriod: DataPeriodContract = {
      info: {
        phoneNumber: '901448858',
        length: 9,
        talkTime: 0,
        betterAttempt: '1.Intento Valor',
        betterAttemptValue: 1,
        totalManagement: 2,
        wrong: 0,
        deceased: 0,
        CD: 0,
        CNE: 0,
        NC: 2,
        betterManagement: 'NC',
        betterManagementDate: null,
      },
      operator: {
        operator: 'movistar',
        phoneNumber: 901448858,
        document: 72525527,
        fullName: 'MARIA LUCERO DEL ROSARIO PANIAGUA LOLI',
        origin: 'MOVISTAR FEBRERO 2023',
        originDate: new Date(),
        activationDate: null,
        subscription: 'SMART 90',
        model: '',
        withWhatsapp: false,
        moreThanOne: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    const fields: SettingsFieldsContract[] = [
      {
        campaign: 'IBK04',
        database: 'infocall',
        tableName: 'claro',
        field: 'plan',
        condition: '=',
        valueCondition: 'SMART 90',
        valueScore: '60',
      },
    ];

    const params: ParamsNumberEvaluationContract = {
      dataPeriod,
      fields,
    };

    const valuesExpected = {
      phoneNumber: '901448858',
      score: 60,
      betterManagement: 'NC',
      beastTry: 0,
      withWhatsapp: false,
    }

    // When
    const numberEvaluationUseCase = new NumberEvaluationUseCase();
    const result = await numberEvaluationUseCase.execute(params);

    // Then
    expect(result).toEqual(valuesExpected);
  });
});
