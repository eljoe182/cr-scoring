import { DataSourceOptions } from 'typeorm';
import config from '@app/config';
import { BitelEntity, ClaroEntity, EntelEntity, MovistarEntity, ScoringEntity } from '@shared/infrastructure/persistance/entities';

export class InfocallConfig {
  public config: DataSourceOptions;

  constructor() {
    this.config = {
      type: 'mysql',
      host: config.DATABASES.INFOCALL.HOST,
      port: Number(config.DATABASES.INFOCALL.PORT),
      username: config.DATABASES.INFOCALL.USERNAME,
      password: config.DATABASES.INFOCALL.PASSWORD,
      database: config.DATABASES.INFOCALL.DATABASE,
      entities: [BitelEntity, ClaroEntity, EntelEntity, MovistarEntity, ScoringEntity],
      logging: true,
      synchronize: false,
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    return this.config;
  }
}
