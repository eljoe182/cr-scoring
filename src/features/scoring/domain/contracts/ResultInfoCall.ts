import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';

export interface ResultInfoCall extends SettingsFields {
  alias: string | undefined;
  columnName: string | undefined;
  columnType: string | undefined;
}
