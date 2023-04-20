export interface SaveHistoricDataParams<D = unknown, R = unknown> {
  period: string;
  data: D;
  result: R;
}
