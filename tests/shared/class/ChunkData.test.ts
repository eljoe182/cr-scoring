import ChunkData from '../../../src/shared/class/ChunkData';

describe('Shared ChunkData', () => {
  it('should returned chunk with default size value', () => {
    // Given
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    const chunkData = new ChunkData(input);

    // When
    const result = [...chunkData.getChunkData()];

    // Then
    expect(result).toEqual([[{ id: 1 }, { id: 2 }], [{ id: 3 }, { id: 4 }], [{ id: 5 }]]);
  });

  it('should split data with custom chunk size', () => {
    // Given
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    const chunkSize = 3;
    const chunkData = new ChunkData(input);

    // When
    const result = [...chunkData.getChunkData(chunkSize)];

    // Then
    expect(result).toEqual([
      [{ id: 1 }, { id: 2 }, { id: 3 }],
      [{ id: 4 }, { id: 5 }],
    ]);
  });

  it('should create a error for empty data', () => {
    // Given
    const input: number[] = [];

    // When
    const createChunkData = () => new ChunkData(input);

    // Then
    expect(createChunkData).toThrowError('Input data must be an array');
  });
});
