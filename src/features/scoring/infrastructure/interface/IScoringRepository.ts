import { SaveScoringDataContract } from '@feat/scoring/domain/contracts/SaveScoringData.contract';
import { Scoring } from '@shared/domain/entities/Scoring';

export interface IScoringRepository {
  getScoring(phoneNumber: string): Promise<unknown>;
  saveScoring(data: SaveScoringDataContract[]): Promise<unknown>;
  getInByPhoneNumber(phoneNumbers: string[]): Promise<Scoring[]>;
}
