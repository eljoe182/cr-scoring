import { IPagination, IResultPagination } from "src/features/scoring/domain/interface";
import { ScoringHistoric } from "src/shared/infrastructure/persistance/entities";

export interface IScoringHistoricRepository {
  saveHistoric(data: ScoringHistoric): Promise<unknown>;
  findAll(pagination: IPagination): Promise<IResultPagination<ScoringHistoric[]>>;
}
