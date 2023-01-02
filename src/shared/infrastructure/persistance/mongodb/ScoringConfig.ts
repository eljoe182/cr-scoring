import config from '@app/config';
import { DataSourceOptions } from 'typeorm';
import { SettingsFields } from '@shared/domain/entities/Scoring';

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
      ssl: true,
      entities: [SettingsFields],
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    return this.config;
  }
}
