import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';

export type ResultInfoCall = SettingsFields & {
  alias: string;
  columnName: string;
  columnType: string;
};

export type EvaluationResult = Omit<ResultInfoCall, 'valueCondition'> & {
  valueCondition: string | number | boolean | object;
}
