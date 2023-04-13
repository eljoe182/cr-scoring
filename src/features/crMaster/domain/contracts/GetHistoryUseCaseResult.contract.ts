import { HistoryResultContract } from "./HistoryResultContract";

export interface GetHistoryUseCaseResult {
  success: HistoryResultContract[];
  errors: string[];
}