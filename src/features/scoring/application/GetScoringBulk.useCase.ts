import { IBaseUseCase } from 'src/shared/domain';
import { IScoringRepository } from '../infrastructure/interface';
import ChunkData from 'src/shared/class/ChunkData';

export default class GetScoringBulkUseCase implements IBaseUseCase {
  constructor(private repository: IScoringRepository<number[]>) {}
  public async execute(params: number[]): Promise<unknown> {
    const phoneNumbersChunked = new ChunkData(params).getChunkData(1000);

    const result = await Promise.allSettled(
      phoneNumbersChunked.map(async (item) => {
        return this.repository.getInByPhoneNumber(item);
      })
    ).then((results) => {
      return results.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value;
        }
        return [];
      });
    });

    return Promise.resolve(result.flat());
  }
}
