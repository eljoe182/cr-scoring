import { Request, Response } from 'express';
import GetAllCampaignsController from '../../../src/app/controllers/crMaster/GetAllCampaigns.controller';

describe('Get All Campaigns Controller', () => {
  const mockRequest = {} as Request;
  const mockNext = jest.fn();
  const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

  it('should response 200', async () => {
    // Given
    const mockUseCaseResponse = [
      { id: 1, name: 'Campaign 1' },
      { id: 2, name: 'Campaign 2' },
    ];
    const mockUseCase = { execute: jest.fn().mockResolvedValue(mockUseCaseResponse) };
    const controller = new GetAllCampaignsController(mockUseCase);

    // When
    await controller.run(mockRequest, mockResponse, mockNext);

    // Then
    expect(mockUseCase.execute).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUseCaseResponse);
  });

  it('should returned empty array', async () => {
    // Given
    const mockUseCase = {
      execute: jest.fn().mockResolvedValue([]),
    };
    const controller = new GetAllCampaignsController(mockUseCase);

    // When
    await controller.run(mockRequest, mockResponse, mockNext);

    // Then
    expect(mockUseCase.execute).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([]);
  });

  it('should error handling', async () => {
    // Given
    const mockError = new Error('Test Error');
    const mockUseCase = {
      execute: jest.fn().mockRejectedValue(mockError),
    };
    const controller = new GetAllCampaignsController(mockUseCase);

    // When
    await controller.run(mockRequest, mockResponse, mockNext);

    // Then
    expect(mockUseCase.execute).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
