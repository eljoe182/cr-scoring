import { SaveScoringDataContract } from '@feat/scoring/domain/contracts/SaveScoringData.contract';

export interface IScoringRepository {
  getScoring(phoneNumber: string): Promise<unknown>;
  saveScoring(data: SaveScoringDataContract[]): Promise<unknown>;
}
