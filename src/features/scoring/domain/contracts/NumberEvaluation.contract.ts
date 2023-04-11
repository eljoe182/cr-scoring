import { DataPeriodContract } from './DataPeriod.contract';
import { SettingsFieldsContract } from '../../../settingFields/domain/contracts/SettingsFields.contract';

export interface ParamsNumberEvaluationContract {
  dataPeriod: DataPeriodContract;
  fields?: SettingsFieldsContract[];
}
