export interface IGetScoring {
  getScoring(period: string): Promise<unknown>;
}
