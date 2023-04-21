export const expectedValueSetOperatorUseCase = {
  success: [
    {
      info: {
        phoneNumber: 901448858,
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
        document: '72525527',
        fullName: 'MARIA LUCERO DEL ROSARIO PANIAGUA LOLI',
        origin: 'MOVISTAR FEBRERO 2023',
        originDate: '2023-02-03',
        activationDate: null,
        subscription: '',
        model: 'IPhone 11',
        withWhatsapp: 0,
        moreThanOne: false,
        createdAt: '2023-04-05T19:31:47.000Z',
        updatedAt: null,
      },
    },
  ],
  errors: [],
};

export const paramsSetOperatorUseCase = [
  {
    phoneNumber: 901448858,
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
];

export const mockSetOperatorUseCase = {
  execute: jest.fn().mockResolvedValue(expectedValueSetOperatorUseCase),
};
