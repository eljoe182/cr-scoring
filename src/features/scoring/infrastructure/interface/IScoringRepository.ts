export interface IScoringRepository<P = unknown, R = unknown> {
  getScoring(phoneNumber: P): Promise<R>;
  saveScoring(data: P): Promise<R>;
  getInByPhoneNumber(phoneNumbers: P): Promise<R>;
}
