export const mockManagementRepository = {
  getManagementHistory: jest.fn().mockResolvedValue([
    {
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
  ]),
};

export const infoManagementHistory = {
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
};
