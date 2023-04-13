import { DataPeriodContract } from './DataPeriod.contract';
import { SettingsFieldsContract } from '../../../settingFields/domain/contracts';

export interface ParamsNumberEvaluationContract {
  dataPeriod: DataPeriodContract;
  fields?: SettingsFieldsContract[] | null;
}
