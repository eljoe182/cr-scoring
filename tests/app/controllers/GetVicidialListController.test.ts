import { Request, Response } from 'express';
import GetVicidialListController from '../../../src/app/controllers/crMaster/GetVicidialListUseCase.controller';

describe('Get VicidialList Controller', () => {
  const mockReq = {} as Request;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const mockNext = jest.fn();

  it('should return 200 code with the expected JSON response', async () => {
    // Given
    const mockResponse = {
      listId: 1,
      listName: 'Test List',
      campaignId: '123',
      active: 'Y',
    };
    const mockUseCase = {
      execute: jest.fn().mockResolvedValue(mockResponse),
    };
    const controller = new GetVicidialListController(mockUseCase);

    // When
    await controller.run(mockReq, mockRes, mockNext);

    // Then
    expect(mockUseCase.execute).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should returned empty array', async () => {
    // Given
    const mockUseCase = {
      execute: jest.fn().mockResolvedValue([]),
    };
    const controller = new GetVicidialListController(mockUseCase);

    // When
    await controller.run(mockReq, mockRes, mockNext);

    // Then
    expect(mockUseCase.execute).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([]);
  });

  it('should error handling', async () => {
    // Given
    const mockError = new Error('Test Error');
    const mockUseCase = {
      execute: jest.fn().mockRejectedValue(mockError),
    };
    const controller = new GetVicidialListController(mockUseCase);

    // When
    await controller.run(mockReq, mockRes, mockNext);

    // Then
    expect(mockUseCase.execute).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
