import { Request, Response } from 'express';
import GetScoringController from '../../../../src/app/controllers/scoring/GetScoring.controller';

describe('Get Scoring Controller', () => {
  const mockRequest = {
    body: { dateFrom: new Date(), dateTo: new Date(), listId: 1, campaign: 'some campaign' },
  } as Request;
  const mockRequest404 = { body: {} } as Request;
  const mockRequestInvalidDate = {
    body: { dateFrom: 'invalid date', dateTo: 'invalid date', listId: 'invalid id', campaign: 123 },
  } as Request;
  const mockNext = jest.fn();
  const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

  it('Tests that a valid request body returns data with status 200', async () => {
    // Given
    const mockGetScoringUseCase = {
      execute: jest.fn().mockResolvedValue({ data: 'some data' }),
    };
    const controller = new GetScoringController(mockGetScoringUseCase);

    // When
    await controller.run(mockRequest, mockResponse, mockNext);

    // Then
    expect(mockGetScoringUseCase.execute).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: 'some data' });
  });

  it('Tests that an empty request body returns 404', async () => {
    // Given
    const mockGetScoringUseCase = {
      execute: jest.fn(),
    };
    const controller = new GetScoringController(mockGetScoringUseCase);

    // When
    await controller.run(mockRequest404, mockResponse, mockNext);

    // Then
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Numbers not founds' });
  });

  it('Tests that an invalid request body returns 404', async () => {
    // Given
    const mockGetScoringUseCase = {
      execute: jest.fn(),
    };
    const controller = new GetScoringController(mockGetScoringUseCase);

    // When
    await controller.run(mockRequestInvalidDate, mockResponse, mockNext);

    // Then
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Numbers not founds' });
  });

  it('Tests that the execute method of getScoringUseCase is called', async () => {
    // Given
    const mockGetScoringUseCase = {
      execute: jest.fn(),
    };
    const controller = new GetScoringController(mockGetScoringUseCase);

    // When
    await controller.run(mockRequest, mockResponse, mockNext);

    // Then
    expect(mockGetScoringUseCase.execute).toHaveBeenCalledWith(mockRequest.body);
  });
});
