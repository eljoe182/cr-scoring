import { IPagination } from "../../../../features/scoring/domain/interface/IPagination";
import { IResultPagination } from "../../../../features/scoring/domain/interface/IResultPagination";
import { ScoringHistoric } from "../../../../shared/infrastructure/persistance/entities";

export interface IScoringHistoricRepository {
  saveHistoric(data: ScoringHistoric): Promise<unknown>;
  findAll(pagination: IPagination): Promise<IResultPagination>;
}
