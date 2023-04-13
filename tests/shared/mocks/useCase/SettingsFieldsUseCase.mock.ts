export const expectedResultSettingsFields = {
  page: 1,
  limit: 10,
  rowsCount: 1,
  rows: [
    {
      campaign: 'IBK04',
      database: 'infocall',
      tableName: 'movistar',
      field: 'modelo',
      condition: '=',
      valueCondition: 'IPhone 11',
      valueScore: '20',
    },
  ],
};

export const mockSettingsFieldsUseCase = {
  execute: jest.fn().mockResolvedValue(expectedResultSettingsFields),
};
