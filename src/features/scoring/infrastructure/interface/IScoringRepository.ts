export interface IScoringRepository {
  getScoring(phoneNumber: number): Promise<unknown>;
}
