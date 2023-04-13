export const mockSettingsFieldsRepository = {
  save: jest.fn(),
  getAllWithPagination: jest.fn().mockResolvedValue({
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
  }),
  getAll: jest.fn(),
  destroy: jest.fn(),
};
