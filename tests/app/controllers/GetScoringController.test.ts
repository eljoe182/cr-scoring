import { Request, Response } from 'express';
import GetScoringController from '../../../src/app/controllers/scoring/GetScoring.controller';

describe('GetScoringController_class', () => {
  const mockReq = {} as Request;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const mockNext = jest.fn();

  it('should return 200 status', async () => {
    // Given
    const mockResponseManagementHistory = [{ operator: { id: 1 }, score: 50 }];
    const mockResponseSettingsFields = {
      rows: [
        {
          id: 1,
          campaign: 'test',
          database: 'test',
          tableName: 'test',
          field: 'test',
          condition: 'test',
          valueCondition: 'test',
          valueScore: 10,
        },
      ],
      rowsCount: 1,
    };
    const mockResponse = { body: { dateFrom: new Date(), dateTo: new Date(), listId: 1, campaign: 'test' } };
    const mockManagementHistoryUseCase = {
      execute: jest.fn().mockResolvedValue(mockResponseManagementHistory),
    };
    const mockGetSettingsFieldsUseCase = {
      execute: jest.fn().mockResolvedValue(mockResponseSettingsFields),
    };
    const controller = new GetScoringController(mockManagementHistoryUseCase, mockGetSettingsFieldsUseCase);

    // When
    await controller.run(mockReq, mockRes, mockNext);

    // Then
    expect(mockManagementHistoryUseCase.execute).toHaveBeenCalledWith(mockResponse.body);
    expect(mockGetSettingsFieldsUseCase.execute).toHaveBeenCalledWith({
      campaign: mockResponse.body.campaign,
      limit: 100,
      page: 1,
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([{ operator: { id: 1 }, score: 60 }]);
  });

  it('should returns a 404', async () => {
    // Given
    const mockResponseSettingsFields = { rows: [], rowsCount: 0 };
    const mockManagementHistoryUseCase = {
      execute: jest.fn().mockResolvedValue(null),
    };
    const mockGetSettingsFieldsUseCase = {
      execute: jest.fn().mockResolvedValue(mockResponseSettingsFields),
    };
    const mockResponse = { body: { dateFrom: new Date(), dateTo: new Date(), listId: 1, campaign: 'test' } };
    const controller = new GetScoringController(mockManagementHistoryUseCase, mockGetSettingsFieldsUseCase);

    // When
    await controller.run(mockReq, mockRes, mockNext);

    // Then
    expect(mockManagementHistoryUseCase.execute).toHaveBeenCalledWith(mockResponse.body);
    expect(mockGetSettingsFieldsUseCase.execute).toHaveBeenCalledWith({
      campaign: mockResponse.body.campaign,
      limit: 100,
      page: 1,
    });
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Numbers not founds' });
  });

  it('test_empty_settings_fields', async () => {
    // Given
    const mockManagementHistoryUseCase = {
      execute: jest.fn().mockResolvedValue([{ operator: { id: 1 }, score: 50 }]),
    };
    const mockGetSettingsFieldsUseCase = {
      execute: jest.fn().mockResolvedValue({ rows: [], rowsCount: 0 }),
    };
    const mockResponse = { body: { dateFrom: new Date(), dateTo: new Date(), listId: 1, campaign: 'test' } };
    const controller = new GetScoringController(mockManagementHistoryUseCase, mockGetSettingsFieldsUseCase);

    // When
    await controller.run(mockReq, mockRes, mockNext);

    // Then
    expect(mockManagementHistoryUseCase.execute).toHaveBeenCalledWith(mockReq.body);
    expect(mockGetSettingsFieldsUseCase.execute).toHaveBeenCalledWith({
      campaign: mockResponse.body.campaign,
      limit: 100,
      page: 1,
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([{ operator: { id: 1 }, score: 50 }]);
  });
});
