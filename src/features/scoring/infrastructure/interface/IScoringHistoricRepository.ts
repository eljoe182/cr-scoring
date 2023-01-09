import { IPagination } from "@feat/scoring/domain/interface/IPagination";
import { IResultPagination } from "@feat/scoring/domain/interface/IResultPagination";
import { ScoringHistoric } from "@shared/domain/entities/Scoring";

export interface IScoringHistoricRepository {
  saveHistoric(data: ScoringHistoric): Promise<unknown>;
  findAll(pagination: IPagination): Promise<IResultPagination>;
}
