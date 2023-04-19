import { Request, Response, NextFunction } from 'express';
import { IBaseController, IBaseUseCase } from 'src/shared/domain';
import { GetScoringResult, SaveScoringParams } from 'src/features/scoring/domain/contracts';
import { SaveScoringResults } from 'src/features/scoring/domain/contracts/ISaveScoringResults';
import ChunkData from 'src/shared/class/ChunkData';

export default class SaveScoringController implements IBaseController {
  constructor(
    private getScoringUseCase: IBaseUseCase<SaveScoringParams, GetScoringResult[]>,
    private saveScoringUseCase: IBaseUseCase<GetScoringResult[], SaveScoringResults>
  ) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const body = req.body as SaveScoringParams;
    const data = await this.getScoringUseCase.execute(body);

    const chunkData = new ChunkData(data).getChunkData(1000);

    const scoringSaved = await Promise.allSettled(
      chunkData.map(async (item) => {
        return await this.saveScoringUseCase.execute(item);
      })
    ).then((results) => {
      const success: unknown[] = [];
      const error: unknown[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          success.push(result.value);
        } else {
          error.push(result.reason);
        }
      });

      return { success, error };
    });

    res.status(200).json(scoringSaved);
  }
}
