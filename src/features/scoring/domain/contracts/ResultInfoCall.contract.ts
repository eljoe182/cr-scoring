export interface ResultInfoCall {
  campaign: string;
  condition: string;
  database: string;
  field: string;
  tableName: string;
  valueCondition: string;
  valueScore: string;
  alias: string | undefined;
  columnName: string | undefined;
  columnType: string | undefined;
}
