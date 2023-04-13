const dataPeriod = {
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
    subscription: '',
    model: 'IPhone 11',
    withWhatsapp: false,
    moreThanOne: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};
const fields = [
  {
    campaign: 'IBK04',
    database: 'infocall',
    tableName: 'movistar',
    field: 'modelo',
    condition: '=',
    valueCondition: 'IPhone 11',
    valueScore: '20',
  },
];

export const paramsNumberEvaluation = {
  dataPeriod,
  fields,
};

export const expectedResultNumberEvaluation = {
  phoneNumber: '901448858',
  score: 20,
  betterManagement: 'NC',
  beastTry: 0,
  withWhatsapp: false,
};

export const mockNumberEvaluationUseCase = {
  execute: jest.fn().mockResolvedValue(expectedResultNumberEvaluation),
};
