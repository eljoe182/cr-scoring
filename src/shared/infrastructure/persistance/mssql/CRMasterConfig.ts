import { DataSourceOptions } from 'typeorm';
import config from '@app/config';
import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';

export class CRMasterConfig {
  public config: DataSourceOptions;

  constructor() {
    this.config = {
      type: 'mssql',
      host: config.CR_MASTER.HOST,
      port: Number(config.CR_MASTER.PORT),
      username: config.CR_MASTER.USERNAME,
      password: config.CR_MASTER.PASSWORD,
      database: config.CR_MASTER.DATABASE,
      entities: [Resumenfono],
      logging: true,
      synchronize: false,
      options: {
        encrypt: false,
      },
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    return this.config;
  }
}
