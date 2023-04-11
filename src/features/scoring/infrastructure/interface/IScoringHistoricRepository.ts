import { IPagination } from "@feat/scoring/domain/interface/IPagination";
import { IResultPagination } from "@feat/scoring/domain/interface/IResultPagination";
import { ScoringHistoric } from "@shared/infrastructure/persistance/entities/Scoring";

export interface IScoringHistoricRepository {
  saveHistoric(data: ScoringHistoric): Promise<unknown>;
  findAll(pagination: IPagination): Promise<IResultPagination>;
}
