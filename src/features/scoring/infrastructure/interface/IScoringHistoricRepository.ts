import { IPagination, IResultPagination } from "../../../../features/scoring/domain/interface";
import { ScoringHistoric } from "../../../../shared/infrastructure/persistance/entities";

export interface IScoringHistoricRepository {
  saveHistoric(data: ScoringHistoric): Promise<unknown>;
  findAll(pagination: IPagination): Promise<IResultPagination<ScoringHistoric[]>>;
}
