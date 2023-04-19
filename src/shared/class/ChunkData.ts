export default class ChunkData<T> {
  private static readonly DEFAULT_CHUNK_SIZE = 2;
  constructor(private data: T[]) {
    this.validateData();
  }

  private validateData(): void {
    if (!Array.isArray(this.data) || this.data.length === 0) {
      throw new Error('Input data must be an array');
    }
  }

  private validateChunkSize(chunkSize: number): void {
    if (typeof chunkSize !== 'number') {
      throw new Error('Chunk size must be a number');
    }
  }

  getChunkData(chunkSize = ChunkData.DEFAULT_CHUNK_SIZE): T[][] {
    this.validateChunkSize(chunkSize);
    const chunkedData: any[] = [];
    for (let i = 0; i < this.data.length; i += chunkSize) {
      chunkedData.push(this.data.slice(i, i + chunkSize));
    }
    return chunkedData;
  }
}
