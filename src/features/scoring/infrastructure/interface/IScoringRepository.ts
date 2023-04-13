import { SaveScoringDataContract } from 'src/features/scoring/domain/contracts';

export interface IScoringRepository {
  getScoring(phoneNumber: string): Promise<unknown>;
  saveScoring(data: SaveScoringDataContract[]): Promise<unknown>;
  getInByPhoneNumber(phoneNumbers: string[]): Promise<unknown>;
}
