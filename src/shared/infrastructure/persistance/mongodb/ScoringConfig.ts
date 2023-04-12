import config from '../../../../app/config';
import { DataSourceOptions } from 'typeorm';
import { ScoringHistoricEntity, SettingsFieldsEntity } from '../../../../shared/infrastructure/persistance/entities';

export class ScoringConfig {
  public config: DataSourceOptions;

  constructor() {
    this.config = {
      type: 'mongodb',
      url: config.DATABASES.SCORING.HOST,
      useNewUrlParser: true,
      synchronize: true,
      useUnifiedTopology: true,
      logging: true,
      ssl: false,
      entities: [SettingsFieldsEntity, ScoringHistoricEntity],
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    return this.config;
  }
}
