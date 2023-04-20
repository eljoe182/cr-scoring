export interface IScoringHistoricRepository<P = unknown, R = unknown> {
  saveHistoric(data: P): Promise<R>;
  findAll(params: P): Promise<R>;
}
