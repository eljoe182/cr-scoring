export interface IScoringRulesRepository<P = unknown, R = unknown> {
  get(campaign: string): Promise<R>;
  save(rules: P): Promise<R>;
}