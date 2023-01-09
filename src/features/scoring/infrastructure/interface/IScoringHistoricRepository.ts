import { ScoringHistoric } from "@shared/domain/entities/Scoring";

export interface IScoringHistoricRepository {
  saveHistoric(data: ScoringHistoric): Promise<unknown>;
}
