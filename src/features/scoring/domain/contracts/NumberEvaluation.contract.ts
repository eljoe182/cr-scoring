import { DataPeriodContract } from './DataPeriod.contract';
import { SettingsFieldsContract } from './SettingsFields.contract';

export interface ParamsNumberEvaluationContract {
  dataPeriod: DataPeriodContract;
  fields?: SettingsFieldsContract[];
}
